// app/api/polish-summary/route.ts (Complete and Correct)

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });

  const genAI = new GoogleGenerativeAI(apiKey);

  const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  ];

  try {
    const { text }: { text: string } = await request.json();
    if (!text) return NextResponse.json({ polishedText: "" });

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest', safetySettings });

    const prompt = `
      You are a professional medical editor. The following text is an AI-generated summary of a doctor's consultation.
      Your task is to polish it. Correct any spelling errors, fix grammar, and improve the sentence structure to make it clear, professional, and reassuring for a patient.
      Do not add new medical information. Only improve the existing text. Return only the polished text as a single string.

      **Original Text:**
      ---
      ${text}
      ---
      
      **Polished Text:**
    `;

    const result = await model.generateContent(prompt);
    const polishedText = result.response.text();

    return NextResponse.json({ polishedText });
  } catch (error) {
    console.error('Error in /api/polish-summary:', error);
    return NextResponse.json({ error: 'Failed to polish summary.' }, { status: 500 });
  }
}