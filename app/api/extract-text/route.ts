import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { ExtractTextRequest, ExtractTextResponse, ApiError } from '@/types/api';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function POST(request: NextRequest): Promise<NextResponse<ExtractTextResponse | ApiError>> {
  try {
    const body: ExtractTextRequest = await request.json();
    const { imageData } = body;

    if (!imageData) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      );
    }

    // Validate and clean base64 data
    const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '');
    
    if (!base64Data) {
      return NextResponse.json(
        { error: 'Invalid image data format' },
        { status: 400 }
      );
    }

    // Determine MIME type from original data URL
    const mimeTypeMatch = imageData.match(/^data:(image\/[a-z]+);base64,/);
    const mimeType = mimeTypeMatch?.[1] || 'image/jpeg';

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `Extract all text from this image. Please return only the extracted text, maintaining the original structure and formatting as much as possible. If no text is found, return "No text detected in the image."`;
    
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'
        }
      }
    ]);

    const response = await result.response;
    const extractedText = response.text();
    
    return NextResponse.json({ text: extractedText });
  } catch (error) {
    console.error('Error extracting text:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to extract text';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}