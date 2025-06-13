// app/api/process-consultation/route.ts (This is the only AI processing route you need)

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// This is the data structure the AI will create
export interface ProcessedConsultation {
  patientEmail: string | null;
  patientPhoneNumber: string | null;
  doctorName: string | null;
  complaint: string | null;
  consultationItems: {
    labWork: string;
    labResults: string | null;
    drugs: string | null;
    fee: number | null;
    enrichedInfo?: {
      correctedName: string;
      dosageSchedule: string;
      duration: string;
      advice: string;
    } | null;
  }[];
  summaryNotes: string;
}

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
    const { imageData }: { imageData: string } = await request.json();
    if (!imageData) return NextResponse.json({ error: 'Image data is required' }, { status: 400 });

    const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '');
    const mimeTypeMatch = imageData.match(/^data:(image\/[a-z]+);base64,/);
    const mimeType = mimeTypeMatch?.[1] || 'image/jpeg';
    
    // --- FIX: Use the correct, powerful model ---
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash', safetySettings });

    // --- FIX: New High-Precision, Anti-Hallucination Prompt ---
    const prompt = `
      You are a meticulous data-entry AI. Your task is to analyze the provided image of a handwritten doctor's note and convert it into a structured JSON object. You must be extremely precise.

      **CRITICAL RULES:**
      1.  **DO NOT HALLUCINATE OR INVENT DATA:** For the fields 'patientEmail', 'patientPhoneNumber', and 'doctorName', you MUST extract the exact text from the document. If the information is not present, is crossed out, or is unreadable, you MUST use the value \`null\`.
      2.  **STRICT JSON ONLY:** Your entire output must be a single, valid JSON object. Do not include any text, apologies, or markdown like \`\`\`json before or after the JSON.

      **Step-by-Step Instructions:**
      1.  **Header Extraction:** Find the "Phone", "Email", "Doctor", and "Complain" fields from the image text. Extract their values EXACTLY as written.
      2.  **Table Parsing:** Analyze the table with columns "Lab Work", "Lab Result", "Drugs", and "Fee (XAF)".
          - Create an item in 'consultationItems' for each distinct test or medication.
          - If multiple drugs are in one cell, create a *separate* 'consultationItems' entry for each drug, copying the 'labWork' and 'labResults' for that row.
      3.  **Medication Enrichment:** For each drug item, create an 'enrichedInfo' sub-object.
          - 'correctedName': The proper name of the drug (e.g., "Combret" -> "Coartem", "Efferlgan" -> "Efferalgan").
          - 'dosageSchedule', 'duration', 'advice': Provide patient-friendly instructions based on the shorthand (e.g., '1-0-1' and 'x 3days').
      4.  **Summary Generation:** Write a professional summary for 'summaryNotes' based ONLY on the extracted 'complaint' and 'labResults'.
      5.  **Final Review:** Before responding, double-check that the 'patientEmail', 'patientPhoneNumber', and 'doctorName' in your generated JSON exactly match the text seen on the paper.

      **Example based on the provided image:**
      \`\`\`json
      {
        "patientEmail": "tonyuynudegita@gmail.com",
        "patientPhoneNumber": "+257672792565",
        "doctorName": "Tonyuy Ortu",
        "complaint": "Patient complains of high fever and painful stomach in the epigastric region.",
        "consultationItems": [
          {
            "labWork": "Test",
            "labResults": "BP=120/80mmhg, P=103blm, T=38.9, weight=70kg",
            "drugs": null,
            "fee": 0,
            "enrichedInfo": null
          },
          {
            "labWork": "Checking against Malaria",
            "labResults": "Positive widal S70120 Ca21, positive MP",
            "drugs": "Combret 80/480x 3days 1-0-1",
            "fee": 2000,
            "enrichedInfo": {
              "correctedName": "Coartem (Artemether/Lumefantrine) 80/480mg",
              "dosageSchedule": "1 tablet in the morning, 0 in the afternoon, 1 tablet in the evening.",
              "duration": "For 3 days.",
              "advice": "Take with a high-fat meal or drink (like milk) to help absorption. Finish the entire course even if you feel better."
            }
          },
          {
            "labWork": "Checking against Malaria",
            "labResults": "Positive widal S70120 Ca21, positive MP",
            "drugs": "Efferlgan 2-0-2 x 5day",
            "fee": null,
            "enrichedInfo": {
              "correctedName": "Efferalgan (Paracetamol)",
              "dosageSchedule": "2 tablets in the morning, 0 in the afternoon, 2 tablets in the evening.",
              "duration": "For 5 days.",
              "advice": "Dissolve tablets in a full glass of water before drinking. Can be taken with or without food. Use for fever or pain."
            }
          }
        ],
        "summaryNotes": "The patient presented with high fever and epigastric pain. Vital signs show an elevated temperature and pulse. Lab results are positive for Widal and Malaria Parasite. Treatment with Coartem for malaria and Efferalgan for fever has been prescribed."
      }
      \`\`\`
    `;

    const result = await model.generateContent([
        prompt,
        { inlineData: { data: base64Data, mimeType: mimeType as any } }
    ]);
    
    const responseText = result.response.text();
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error(`AI failed to return a JSON object. Response: "${responseText.substring(0, 100)}..."`);
    }

    const jsonString = jsonMatch[0];
    const processedData: ProcessedConsultation = JSON.parse(jsonString);
    
    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Error in /api/process-consultation:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to process image with AI.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}