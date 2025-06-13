// File: src/app/api/transcribe/route.ts

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// --- Configuration ---
const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/openai/whisper-large-v3";
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// --- Initialize Gemini Client ---
if (!GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in environment variables.");
}
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
// Use the latest, recommended model name
const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });


async function transcribeAudioWithWhisper(audioBuffer: Buffer): Promise<string> {
  console.log(`Sending audio to Hugging Face Whisper API...`);

  const response = await fetch(HUGGINGFACE_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
      'Content-Type': 'audio/webm',
    },
    body: audioBuffer,
  });
  
  if (!response.ok) {
      const errorText = await response.text();
      console.error("Hugging Face API Error:", errorText);
      if(response.status === 503) {
          throw new Error("The AI transcription model is currently loading. Please try again in 30 seconds.");
      }
      throw new Error(`Hugging Face API failed: ${errorText}`);
  }

  const result = await response.json();
  const transcription = result.text;
  console.log('Hugging Face transcription successful:', transcription);
  return transcription;
}


async function translateTextWithGemini(text: string): Promise<string> {
    if (!text || text.trim() === "") {
        return "Patient did not provide any spoken input.";
    }

    console.log(`Sending transcribed text to Gemini for translation: "${text}"`);
    
     const prompt = `
### ROLE
You are an expert medical transcriptionist and translator, specializing in converting informal dialects into formal clinical language.

### CONTEXT
You will receive a raw text transcription from a patient's voice message. The patient is likely from Cameroon and may be speaking Cameroonian Pidgin, broken English, or a mix of languages The final text is for a doctor or nurse to read quickly and understand the patient's condition.No french

### PRIMARY GOAL
Your task is to translate and rephrase the raw text into clear, concise, and professional standard English suitable for a medical file.

### CRITICAL RULES
1.  **PRESERVE MEDICAL ACCURACY:** Do not guess, infer, or add symptoms that are not explicitly mentioned. If a patient says "headache," write "headache," not "migraine." If a patient says "I get fever," write "I have a fever," not "I have a high-grade fever." Stick to the facts provided.
2.  **MAINTAIN NEUTRAL TONE:** Report the patient's symptoms factually. Do not add emotional language (e.g., "The patient is suffering terribly").
3.  **NO EXTRA COMMENTARY:** Do not add any introductory phrases like "Here is the translation:", "The patient said:", or any other conversational text.
4.  **OUTPUT ONLY THE FINAL TEXT:** Your entire response should only be the clean, translated English sentence(s).
5.  **HANDLE GOOD ENGLISH:** If the input text is already in clear, standard English, simply return it as is, or with only minor grammatical corrections if necessary.

### EXAMPLES (Pidgin/Broken English -> Standard English)

**Input:** "My belle dey hot me bad bad and my head dey turn."
**Output:** I am experiencing a severe fever and dizziness.

**Input:** "I di cough since three day now, and when I cough, my chest dey pain me."
**Output:** I have had a cough for the past three days, and I experience chest pain when I cough.

**Input:** "The malaria medicine no work. I still dey sick."
**Output:** The malaria medication was not effective. I am still feeling sick.

**Input:** "I just need a refill for my blood pressure medication."
**to:** I need a refill for my blood pressure medication.

**Input:** "I get pain for my back for down side."
**Output:** I have pain in my lower back.

---

### PATIENT'S RAW TEXT TO TRANSLATE:
"${text}"
    `;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const translatedText = response.text();

    console.log('Gemini translation successful:', translatedText);
    return translatedText;
}


export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File | null;

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file was provided.' }, { status: 400 });
    }

    const audioBuffer = Buffer.from(await audioFile.arrayBuffer());

    // --- Step 1: Transcribe the audio ---
    const transcribedText = await transcribeAudioWithWhisper(audioBuffer);

    // --- Step 2: Translate the transcribed text ---
    const finalEnglishText = await translateTextWithGemini(transcribedText);
    
    // --- Step 3: Return the final English text to the frontend ---
    return NextResponse.json({ transcription: finalEnglishText });

  } catch (error) {
    console.error('Error in the transcription/translation route:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}