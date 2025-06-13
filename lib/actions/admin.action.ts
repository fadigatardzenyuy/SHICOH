// app/(dashboard)/dashboard/actions.ts

"use server";

// import { createSupabaseServerAdminClient } from "@/lib/supabase/client";
import { revalidatePath } from "next/cache";
import { createSupabaseServerAdminClient } from "../client";

// This type should match the data object we prepare on the client-side
interface ConsultationPayload {
  doctor_name: string | null;
  patient_email: string | null;
  patient_phone_number: string | null;
  complaint: string | null;
  consultation_items: any; // Using `any` for simplicity, but it's JSONB
  summary_notes: string;
  total_fee: number;
  image_url: string | null; // Pass the image URL for storage
}

export async function processAndSaveConsultation(payload: ConsultationPayload) {
  try {
    const supabase = createSupabaseServerAdminClient();

    // 1. Validate the incoming patient email
    if (!payload.patient_email) {
      throw new Error("Patient email is missing from the processed data.");
    }
    const patientEmail = payload.patient_email.trim().toLowerCase();

    // 2. Find the patient's profile in Supabase using their email.
    // We use the admin client to search all profiles.
    const { data: patientProfile, error: profileError } = await supabase
      .from('profiles')
      .select('id') // We only need the ID
      .eq('email', patientEmail)
      

    if (profileError || !patientProfile) {
      console.warn(`Could not find profile for email: ${patientEmail}. Error: ${profileError?.message}`);
      // Decide how to handle this: you could throw an error, or save the consultation without a user_id link.
      // For now, we'll throw an error to be safe.
      console.log("Profile eror is:", profileError)
      console.log("patien t Profile not found")
      throw new Error(`No patient profile found with the email "${patientEmail}". Please ensure the patient is registered.`);
    }
    
    const patientUserId = patientProfile.id;

    // 3. Prepare the data for insertion into the 'consultations' table
    const consultationData = {
      user_id: patientUserId, // The linked patient's ID
      doctor_name: payload.doctor_name,
      patient_email: patientEmail,
      patient_phone_number: payload.patient_phone_number,
      complaint: payload.complaint,
      consultation_items: payload.consultation_items, // This should be the JSONB data
      summary_notes: payload.summary_notes,
      total_fee: payload.total_fee,
      image_url: payload.image_url,
    };

    // 4. Insert the new consultation record
    const { data: newConsultation, error: insertError } = await supabase
      .from('consultations')
      .insert(consultationData)
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting consultation:", insertError);
      throw new Error(`Failed to save consultation record: ${insertError.message}`);
    }

    console.log(`✅ Successfully saved new consultation ${newConsultation.id} for user ${patientUserId}`);

    // 5. Revalidate paths to ensure data freshness across the app if needed
    revalidatePath('/dashboard'); // Revalidate the dashboard page
    // revalidatePath(`/patients/${patientUserId}`); // Example of revalidating a specific patient's page

    return {
      success: true,
      message: "Consultation saved successfully!",
      data: newConsultation
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected server error occurred.";
    console.error("processAndSaveConsultation Error:", errorMessage);
    return {
      success: false,
      error: errorMessage
    };
  }
}