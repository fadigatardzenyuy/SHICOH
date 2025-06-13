// app/api/extract-text/route.ts (CORRECTED)

import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Server configuration error: API key not found.' }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    const { imageData }: { imageData: string } = await request.json();
    if (!imageData) {
      return NextResponse.json({ error: 'Image data is required' }, { status: 400 });
    }

    const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '');
    if (!base64Data) {
      return NextResponse.json({ error: 'Invalid image data format' }, { status: 400 });
    }

    const mimeTypeMatch = imageData.match(/^data:(image\/[a-z]+);base64,/);
    const mimeType = mimeTypeMatch?.[1] || 'image/jpeg';
    const supportedMimeTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/heic', 'image/heif'];

    if (!supportedMimeTypes.includes(mimeType)) {
      return NextResponse.json({ error: `Unsupported MIME type: ${mimeType}` }, { status: 400 });
    }
    
    // --- FIX: Using the correct, powerful model name ---
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const prompt = `You are an Optical Character Recognition (OCR) specialist. Extract all text from this image of a medical document. Maintain the original structure, line breaks, and formatting as precisely as possible. Return only the extracted text. If no text is found, return "No text detected in the image."`;
    
    const result = await model.generateContent([
      prompt,
      { inlineData: { data: base64Data, mimeType: mimeType as any } }
    ]);

    const extractedText = result.response.text();
    
    return NextResponse.json({ text: extractedText });
  } catch (error) {
    console.error('Error in /api/extract-text:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to extract text from image.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}