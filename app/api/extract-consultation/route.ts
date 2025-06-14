// app/api/extract-consultation/route.ts (CORRECTED AND HARDENED)

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export interface FormattedConsultation {
  patientEmail: string | null;
  patientPhoneNumber: string | null;
  doctorName: string | null;
  complaint: string | null;
  consultationItems: {
    labWork: string;
    labResults: string | null;
    drugs: string | null;
    fee: number | null;
  }[];
  summaryNotes: string;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  
  const genAI = new GoogleGenerativeAI(apiKey);

  // --- SOLUTION 2: Add safety settings to reduce conversational refusals ---
  const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  ];

  try {
    const { text }: { text: string } = await request.json();
    if (!text) return NextResponse.json({ error: 'Text to format is required' }, { status: 400 });

    // --- SOLUTION 1: Correct the model name to a valid, powerful model ---
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash', safetySettings });

    const prompt = `
      You are an expert medical data analyst AI. Your task is to analyze the following raw text from a doctor's consultation paper and structure it into a precise JSON format.

      **CRITICAL INSTRUCTIONS:**
      - You MUST respond with ONLY a valid JSON object.
      - Do NOT include any explanatory text, apologies, or markdown like \`\`\`json before or after the JSON object. Your entire response must be the JSON itself.

      **Data Extraction Rules:**
      1.  **Header:** Find the patient's phone, email, doctor's name, and the "Complain" text.
      2.  **Table:** The table has "Lab Work", "Lab Result", "Drugs", and "Fee (XAF)" columns.
          - The first row is for vital signs under "Test".
          - If multiple drugs are in one cell, create a separate item in the 'consultationItems' array for each drug. The 'labWork' and 'labResults' for the subsequent drug items in the same row should be the same as the first drug item.
      3.  **Fee:** Extract only numbers for the 'fee'. If it says "Free" or is empty, use 0 or null.
      4.  **Summary:** Write a professional summary for 'summaryNotes'.

      **Here is an example of raw text and the perfect JSON output:**
      {
        "patientEmail": "tonyuynudegita@gmail.com",
        "patientPhoneNumber": "+257672792565",
        "doctorName": "Tonyuy Ortu",
        "complaint": "Patient complains of high fever, stomach around and painful stomach at epigastric region.",
        "consultationItems": [
          { "labWork": "Test", "labResults": "BP=120/80mmHg, P=103bpm, T=38.9°C, Weight=70kg", "drugs": null, "fee": 0 },
          { "labWork": "Checking against Malaria", "labResults": "Positive widal S70120 Ca21, positive MP", "drugs": "Combret 80/480x 3days 1-0-1", "fee": 2000 },
          { "labWork": "Checking against Malaria", "labResults": "Positive widal S70120 Ca21, positive MP", "drugs": "Efferlgan 2-0-2 x 5day", "fee": null }
        ],
        "summaryNotes": "The patient presented with high fever and epigastric pain. Vital signs show an elevated temperature and pulse. Lab results confirm a positive Widal test and the presence of malaria parasites. Treatment has been prescribed accordingly."
      }

      ---
      **NOW, PROCESS THIS NEW INPUT TEXT AND PROVIDE ONLY THE JSON OBJECT:**
      ---
      ${text}
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // --- SOLUTION 3: Add robust parsing logic ---
    // First, try to find a JSON block even if the AI added text around it.
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      // If no JSON block is found at all, throw a clear error.
      throw new Error(`AI did not return a valid JSON object. Response: "${responseText.substring(0, 100)}..."`);
    }

    // Try to parse the found JSON block.
    const jsonString = jsonMatch[0];
    const formattedData: FormattedConsultation = JSON.parse(jsonString);
    
    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error in /api/extract-consultation:', error);
    const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to structure consultation data. The document format might be unusual or the AI response was invalid.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}