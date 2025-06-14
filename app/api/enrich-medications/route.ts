// app/api/enrich-medications/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export interface EnrichedMedicationInfo {
  correctedName: string;
  dosageSchedule: string; // e.g., "1 in the morning, 0 in the afternoon, 1 in the evening"
  duration: string; // e.g., "for 3 days"
  advice: string;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    const { medications }: { medications: string[] } = await request.json();
    if (!medications || medications.length === 0) return NextResponse.json({});
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-05-20' }); // USE THE PRO MODEL

    const prompt = `
      You are an expert pharmacist AI. For each drug string provided, perform these tasks:
      1.  Identify the drug name and correct any spelling mistakes. "Combret" is likely Coartem or a similar Artemether/Lumefantrine combination. "Efferlgan" is Efferalgan (Paracetamol).
      2.  Parse the dosage schedule from the 'x-y-z' format.
      3.  Parse the duration (e.g., 'x 3days').
      4.  Provide patient-friendly advice on HOW to take the medication (e.g., with food, with water).
      
      Return a JSON object where keys are the *original* drug strings and values are objects with the enriched info.

      **EXAMPLE INPUT:**
      ["Combret 80/480x 3days 1-0-1", "Efferlgan 2-0-2 x 5day"]

      **EXAMPLE OUTPUT JSON (Return ONLY this object):**
      \`\`\`json
      {
        "Combret 80/480x 3days 1-0-1": {
          "correctedName": "Coartem (Artemether/Lumefantrine) 80/480mg",
          "dosageSchedule": "1 tablet in the morning, 0 in the afternoon, 1 tablet in the evening.",
          "duration": "For 3 days.",
          "advice": "Take with a high-fat meal or drink (like milk) to help your body absorb the medicine. Do not crush the tablets. Finish the entire course even if you feel better."
        },
        "Efferlgan 2-0-2 x 5day": {
          "correctedName": "Efferalgan (Paracetamol) 1000mg",
          "dosageSchedule": "2 tablets in the morning, 0 in the afternoon, 2 tablets in the evening.",
          "duration": "For 5 days, as needed for fever.",
          "advice": "Dissolve tablets in a full glass of water before drinking. Can be taken with or without food. Do not exceed the recommended dose."
        }
      }
      \`\`\`

      **NOW, PROCESS THIS NEW INPUT DRUG LIST:**
      ${JSON.stringify(medications)}
    `;
    
    const result = await model.generateContent(prompt);
    const jsonString = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    const enrichedData = JSON.parse(jsonString);

    return NextResponse.json(enrichedData);
  } catch (error) {
    console.error('Error in /api/enrich-medications:', error);
    return NextResponse.json({ error: 'Failed to enrich medication data.' }, { status: 500 });
  }
}