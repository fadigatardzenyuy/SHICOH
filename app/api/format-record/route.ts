// app/api/format-record/route.ts

import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

interface FormatRequest {
  text: string;
}

// This interface should match the `formattedData` part of your `PatientRecord` type
interface FormattedDataResponse {
  patientInfo: {
    name: string;
    age: number | null;
    id: string | null;
  };
  diagnosis: string;
  medications: { name: string; dosage: string; frequency: string; }[];
  nextAppointment: string | null;
  notes: string;
}

interface ApiError {
  error: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<FormattedDataResponse | ApiError>> {
  const apiKey = process.env.GOOGLE_AI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Server configuration error: API key not found.' }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    const body: FormatRequest = await request.json();
    const { text } = body;

    if (!text) {
      return NextResponse.json({ error: 'Text to format is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      // generationConfig: { responseMimeType: "application/json" }, // Use JSON mode
    });

    const prompt = `
      You are an intelligent medical record processor. Analyze the following text extracted from a patient document and convert it into a structured JSON object.

      **Instructions:**
      1.  Identify the key information: patient name, age, patient ID, diagnosis, medications (including name, dosage, and frequency), next appointment date, and general notes.
      2.  If a piece of information is not present in the text, use a reasonable default (e.g., null for age, an empty string for notes, an empty array for medications).
      3.  Format the output strictly as a JSON object matching this exact schema:
      
      \`\`\`json
      {
        "patientInfo": {
          "name": "string",
          "age": "number | null",
          "id": "string | null"
        },
        "diagnosis": "string",
        "medications": [
          {
            "name": "string",
            "dosage": "string",
            "frequency": "string"
          }
        ],
        "nextAppointment": "string (YYYY-MM-DD) | null",
        "notes": "string"
      }
      \`\`\`

      **Input Text:**
      ---
      ${text}
      ---

      Return ONLY the JSON object. Do not include any other text, explanations, or markdown formatting like \`\`\`json.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonString = response.text();

    // Clean the response to ensure it's valid JSON
    const cleanedJsonString = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();

    const formattedData: FormattedDataResponse = JSON.parse(cleanedJsonString);

    // Basic validation to ensure the parsed object has the expected top-level keys
    if (!formattedData.patientInfo || !formattedData.medications) {
        throw new Error("Formatted data is missing required properties.");
    }
    
    return NextResponse.json(formattedData);

  } catch (error) {
    console.error('Error formatting record (API Route):', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to format record';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}