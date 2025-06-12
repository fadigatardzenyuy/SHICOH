import { ExtractTextRequest, ExtractTextResponse, ApiError } from '@/types/api';

export class ApiClient {
  private static async request<T>(
    endpoint: string,
    options: RequestInit
  ): Promise<T> {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  }

  static async extractText(imageData: string): Promise<string> {
    const request: ExtractTextRequest = { imageData };
    
    const response = await this.request<ExtractTextResponse>('/api/extract-text', {
      method: 'POST',
      body: JSON.stringify(request),
    });

    return response.text;
  }
}