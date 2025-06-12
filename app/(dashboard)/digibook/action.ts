"use server";

import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

// Helper function to split comma-separated strings into a clean array
const stringToArray = (str: string | undefined): string[] | undefined => {
  if (!str) return undefined;
  return str
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

// This is our secure server action
export async function saveOnboardingData(formData: any) {
  // 1. Authenticate the user on the server
  const { userId, user } = auth();
  if (!userId || !user) {
    return { success: false, error: "Authentication failed. Please sign in." };
  }

  // 2. Create the Supabase Admin Client securely on the server
  // It uses the server-only environment variables.
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  try {
    // 3. Prepare the data for the 'digibooks' table
    const digibookData = {
      id: userId, // Use Clerk user ID as the primary key
      clerk_user_id: userId,
      email: user.primaryEmailAddress?.emailAddress || user.emailAddresses[0]?.emailAddress,
      // Map all form data
      full_name: formData.full_name,
      date_of_birth: formData.date_of_birth,
      gender: formData.gender,
      phone_number: formData.phone_number,
      home_address: formData.home_address,
      next_of_kin: {
        name: formData.next_of_kin_name,
        relationship: formData.next_of_kin_relationship,
        phone: formData.next_of_kin_phone,
      },
      emergency_contact: {
        name: formData.emergency_contact_name,
        phone: formData.emergency_contact_phone,
        relationship: formData.emergency_contact_relationship,
      },
      blood_type: formData.blood_type,
      allergies_text: formData.allergies,
      existing_conditions: stringToArray(formData.existing_conditions),
      medical_history: {
        past_visits: formData.past_hospital_visits,
        surgeries: formData.surgeries,
        family_history: formData.family_medical_history,
      },
      current_medications_text: formData.current_medications,
      primary_doctor: {
        name: formData.primary_doctor_name,
        contact: formData.primary_doctor_contact,
      },
      preferred_hospital: formData.preferred_hospital,
      preferred_language: formData.preferred_language,
      preferred_department: formData.preferred_department,
      accessibility_needs: stringToArray(formData.accessibility_needs),
      insurance_provider: formData.insurance_provider,
      insurance_policy_number: formData.insurance_policy_number,
      insurance_contact_info: formData.insurance_contact_info,
      consent_share_records: formData.consent_share_records,
      consent_notifications: formData.consent_notifications,
      consent_emergency_access: formData.consent_emergency_access,
      updated_at: new Date().toISOString(),
    };

    // 4. Upsert data into 'digibooks' table
    const { error: digibookError } = await supabaseAdmin
      .from("digibooks")
      .upsert(digibookData, { onConflict: "id" });

    if (digibookError) throw digibookError;

    // 5. Prepare and upsert data for the 'profiles' table
    const profileData = {
      clerk_id: userId,
      email: user.primaryEmailAddress?.emailAddress || user.emailAddresses[0]?.emailAddress,
      full_name: formData.full_name,
      onboarding_complete: true,
      updated_at: new Date().toISOString(),
    };

    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .upsert(profileData, { onConflict: "clerk_id" });

    if (profileError) throw profileError;

    console.log(`✅ Successfully saved all data for user ${userId}`);
    return { success: true };

  } catch (error: any) {
    console.error("Server Action Error:", error);
    return { success: false, error: error.message || "An unknown server error occurred." };
  }
}