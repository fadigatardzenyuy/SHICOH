"use server"
import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase"
// Import Google Generative AI SDK
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, GenerationConfig, Part } from "@google/generative-ai";

// --- Existing Types (keep these as they are) ---
interface SavedMessage {
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date; // Or string if you stringify before sending
}

interface GenerateQuizParams {
  companionId: string;
  sessionId: string;
  transcript: SavedMessage[];
  subject: string;
  topic: string;
  language: string;
  learningStyle?: string;
  teachingContent?: string;
  quizTitle?: string;
  numQuestions?: number;
}

interface QuizQuestion {
  id: string; // e.g., "q1", "q2" or a UUID
  type: "multiple_choice" | "true_false" | "short_answer" | "fill_in_the_blank";
  text: string;
  options?: string[];
  correct_answer: string | string[]; // string for single answer, array for multi-select
  explanation?: string;
}
// --- End of Existing Types ---


// --- Existing Actions (createCompanion, getAllCompanions, getCompanion, etc. - keep these) ---
// ...



// --- YOUR NEW SERVER FUNCTION USING GOOGLE GEMINI ---
export const generateQuiz = async (params: GenerateQuizParams) => {
  const {
    companionId,
    sessionId,
    transcript,
    subject,
    topic,
    language,
    learningStyle,
    quizTitle = `Quiz on ${topic}`,
    numQuestions = 5,
  } = params;

  const { userId } =await auth();
  if (!userId) {
    console.error("User not authenticated for quiz generation.");
    throw new Error("User not authenticated.");
  }

  const supabase = createSupabaseClient();
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error("GOOGLE_API_KEY is not set.");
    throw new Error("API key for Google Gemini is missing.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash-preview-05-20", // Or "gemini-2.0-flash" for potentially higher quality but slower/more expensive
    // Or "gemini-pro" if you don't need the 1.5 features / JSON mode is sufficient on older models.
    // Check Gemini documentation for the best model for JSON output.
  });

  console.log(`[generateQuiz Gemini] Starting for user: ${userId}, companion: ${companionId}, session: ${sessionId}`);
  console.log(`[generateQuiz Gemini] Topic: ${topic}, Subject: ${subject}, Language: ${language}`);

  const formattedTranscript = transcript
    .map(msg => `${msg.role === 'user' ? 'Student' : 'Tutor'}: ${msg.content}`)
    .join('\n');

  if (formattedTranscript.length < 50) {
    console.warn("[generateQuiz Gemini] Transcript is very short. Quiz quality might be low.");
  }

  // Construct the prompt for Gemini
  // Gemini works well with a structured prompt, clearly asking for JSON.
  const instructionPrompt = `
You are an expert quiz generation assistant. 
Your task is to create a quiz based on the provided conversation transcript between a Tutor and a Student.
The quiz should test the student's understanding of the key concepts discussed.

Details for the quiz:
- Subject: ${subject}
- Topic: ${topic}
- Language for quiz: ${language}
- Desired number of questions: ${numQuestions}
${learningStyle ? `- Student's learning style: ${learningStyle} (Consider this when formulating questions if applicable).` : ''}

Output Format Instructions:
- Respond ONLY with a valid JSON object.
- The JSON object MUST be an array of question objects.
- Do NOT include any markdown formatting (like \`\`\`json ... \`\`\`) around the JSON.
- Do NOT include any explanatory text or conversation outside the JSON array.

Each question object in the array must have the following fields:
- "id": A unique string identifier for the question (e.g., "q1", "q2").
- "type": A string, one of "multiple_choice", "true_false", "short_answer". Prioritize "multiple_choice" and "true_false".
- "text": A string containing the question itself.
- "options": An array of strings (typically 3-4 for multiple_choice). Required for "multiple_choice", omit for "true_false" and "short_answer".
- "correct_answer": A string containing the correct answer. For "multiple_choice", this should be one of the strings from the "options" array. For "true_false", it should be "True" or "False".
- "explanation": An optional string briefly explaining why the answer is correct.

Example of a multiple_choice question object:
{
  "id": "q1",
  "type": "multiple_choice",
  "text": "What is the capital of France?",
  "options": ["Berlin", "Madrid", "Paris", "Rome"],
  "correct_answer": "Paris",
  "explanation": "Paris is the capital and most populous city of France."
}

Example of a true_false question object:
{
  "id": "q2",
  "type": "true_false",
  "text": "The Earth is flat.",
  "correct_answer": "False",
  "explanation": "Scientific evidence overwhelmingly shows the Earth is an oblate spheroid."
}

Ensure the generated quiz questions are diverse and cover different aspects of the transcript.
Focus on the most important information exchanged.

Transcript is provided below:
---
${formattedTranscript}
---

Generate the quiz now based on the transcript and the instructions above.
`;

  let generatedQuestions: QuizQuestion[] = [];

  try {
    console.log("[generateQuiz Gemini] Sending request to Gemini API...");
    
    const generationConfig: GenerationConfig = {
        responseMimeType: "application/json", // Request JSON output
        temperature: 0.5, // Lower temperature for more deterministic quiz questions
        // maxOutputTokens: 2048, // Adjust as needed
    };
    
    const safetySettings = [ // Optional: configure safety settings
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];

    const parts: Part[] = [{ text: instructionPrompt }];

    const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
    });

    const response = result.response;
    const responseText = response.text(); // text() should give the raw JSON string

    if (!responseText) {
      // Check for blocked content
      if (response.promptFeedback?.blockReason) {
        throw new Error(`Gemini request blocked: ${response.promptFeedback.blockReason} - ${response.promptFeedback.blockReasonMessage}`);
      }
      if (response.candidates && response.candidates[0].finishReason !== 'STOP') {
        throw new Error(`Gemini generation finished unexpectedly: ${response.candidates[0].finishReason}. ${response.candidates[0].finishMessage || ''}`);
      }
      throw new Error("Gemini response content is empty or generation failed.");
    }

    console.log("[generateQuiz Gemini] LLM raw response:", responseText);

    generatedQuestions = JSON.parse(responseText); // Directly parse the text as JSON array

    if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
      console.warn("[generateQuiz Gemini] LLM did not return a valid array of questions, or it was empty. Response was:", responseText);
      // You might want to throw an error here or proceed to save an empty quiz
      // For robustness, let's try to handle cases where it might be nested if strict JSON mode isn't perfect
      try {
        const parsedJson = JSON.parse(responseText);
        if (Array.isArray(parsedJson)) {
            generatedQuestions = parsedJson;
        } else if (parsedJson.questions && Array.isArray(parsedJson.questions)) { // Fallback for { "questions": [...] }
            generatedQuestions = parsedJson.questions;
        } else {
            throw new Error("LLM response is not in the expected array format or {questions: []} format.");
        }
      } catch (parseError) {
          console.error("[generateQuiz Gemini] Error parsing LLM JSON response after initial check:", parseError);
          throw new Error(`Failed to parse LLM JSON response: ${parseError instanceof Error ? parseError.message : String(parseError)}. Raw response: ${responseText}`);
      }
    }
    
    // Basic validation
    generatedQuestions.forEach(q => {
        if (!q.id || !q.type || !q.text || !q.correct_answer) {
            console.warn("[generateQuiz Gemini] A generated question is missing required fields:", q);
        }
        if (q.type === "multiple_choice" && (!q.options || q.options.length < 2)) {
            console.warn("[generateQuiz Gemini] Multiple choice question missing sufficient options:", q);
        }
    });


  } catch (error) {
    console.error("[generateQuiz Gemini] Error calling Gemini API or parsing response:", error);
    // For now, we'll let it proceed to save an empty/partial quiz or fail at DB insertion.
    // More robustly, re-throw:
    // throw new Error(`Failed to generate questions from Gemini: ${error instanceof Error ? error.message : String(error)}`);
  }

  // 3. Store the quiz in Supabase (same as before)
  try {
    console.log("[generateQuiz Gemini] Attempting to save quiz with language:", language); // <--- ADD THIS LOG
    const { data: newQuiz, error: dbError } = await supabase
      .from('quizzes')
      .insert({
        companion_id: companionId,
        user_id: userId,
        session_id: sessionId,
        title: quizTitle,
        subject: subject,
        topic: topic,
        language: language,
        num_questions: generatedQuestions.length,
        questions: generatedQuestions,
      })
      .select()
      .single();

    if (dbError) {
      console.error("[generateQuiz Gemini] Error saving quiz to Supabase:", dbError.message);
      throw new Error(`Database error: ${dbError.message}`);
    }
    if (!newQuiz) {
      throw new Error("Failed to save quiz to database or retrieve it after saving.");
    }

    console.log("[generateQuiz Gemini] Quiz saved successfully to Supabase. Quiz ID:", newQuiz.id);
    return newQuiz;

  } catch (error) {
    console.error("[generateQuiz Gemini] General error in quiz generation or saving process:", error);
    return null; 
  }
};

// --- Other Quiz Fetching Actions (getQuizById, getQuizzesForUser - keep these as they are) ---
export const getQuizById = async (quizId: string) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('id', quizId)
        .single();

    if (error) throw new Error(error.message || "Failed to fetch quiz.");
    return data;
}


export const getQuizzesForUser = async (options: { limit?: number, companionId?: string, topic?: string }) => {
    const { userId } =await auth();
    if (!userId) throw new Error("User not authenticated.");

    const supabase = createSupabaseClient();
    let query = supabase
        .from('quizzes')
        .select('id, title, subject, topic, created_at, num_questions, companion_id, companions(name, id)') // Fetch companion name too
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (options.limit) {
        query = query.limit(options.limit);
    }
    if (options.companionId) {
        query = query.eq('companion_id', options.companionId);
    }
    if (options.topic) {
        query = query.ilike('topic', `%${options.topic}%`);
    }
    
    const { data, error } = await query;

    if (error) throw new Error(error.message || "Failed to fetch user quizzes.");
    return data;
}