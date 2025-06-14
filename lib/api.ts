import { ExtractTextRequest, ExtractTextResponse, ApiError } from '@/types/api';

export class ApiClient {
  private static async request<TResponsePayload>( // Changed T to TResponsePayload for clarity
    endpoint: string,
    options: RequestInit
  ): Promise<TResponsePayload> { // Return type is the expected payload
    let response: Response;
    try {
      response = await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json', // This is for the REQUEST body
          ...options.headers,
        },
        ...options,
      });
    } catch (networkError) {
      // Handle network errors (e.g., server down, DNS issues)
      console.error('Network error in ApiClient.request:', networkError);
      throw new Error(`Network error: ${(networkError as Error).message || 'Failed to connect to API'}`);
    }

    const responseText = await response.text(); // Get text first, regardless of status

    if (!response.ok) {
      // Attempt to parse error response as JSON, but it might not be
      try {
        const errorData: ApiError = JSON.parse(responseText);
        // Throw an error with the message from the API's JSON error response
        throw new Error(errorData.error || `API Error: ${response.status} ${response.statusText} - ${responseText.substring(0,100)}`);
      } catch (e) {
        // If parsing the error response fails, it means the server sent a non-JSON error
        // This is where "Unexpected end of JSON input" could happen if responseText is not JSON
        console.error(`API Error: ${response.status} ${response.statusText}. Response was not valid JSON. Raw response:`, responseText.substring(0, 500) + '...');
        throw new Error(`API Error: ${response.status} ${response.statusText}. Server returned non-JSON response.`);
      }
    }

    // If response.ok is true, we expect valid JSON
    try {
      const data: TResponsePayload = JSON.parse(responseText);
      return data;
    } catch (e) {
      // This is the critical point for "Unexpected end of JSON input" if response.ok was true
      // but the body was still not JSON (which would be a server bug).
      console.error('Failed to parse successful API response as JSON. Raw response:', responseText.substring(0, 500) + '...');
      throw new Error(`Failed to parse successful API response: ${(e as Error).message}. Check server logs for API route: ${endpoint}`);
    }
  }

  static async extractText(imageData: string): Promise<string> {
    const requestBody: ExtractTextRequest = { imageData };
    
    // Our API route should return ExtractTextResponse on success,
    // or an object compatible with ApiError (even if status is 200, though ideally not)
    // The `request` method above will throw if response.ok is false.
    // So if it returns, we expect a successful payload.
    const response = await this.request<ExtractTextResponse | ApiError>('/api/extract-text', { // Expect one of these
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    // Handle cases where server might send 200 OK but with an error structure
    if ('error' in response && response.error) {
      console.warn('API returned 200 OK but with an error message in payload:', response.error);
      throw new Error(response.error);
    }

    if ('text' in response) {
      return response.text;
    }
    
    // This should ideally not be reached if the server adheres to the types
    console.error('Unexpected API response structure after successful request:', response);
    throw new Error('Unexpected API response structure. Expected "text" property.');
  }
}