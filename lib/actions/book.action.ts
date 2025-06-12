// app/(dashboard)/digibook/actions.ts
"use server";
// import { revalidatePath } from "next/cache";

import { auth } from "@clerk/nextjs/server";
// import { createSupabaseServerAdminClient } from "@/lib/supabase/client";
import { 
  DigibookFormData, 
  ApiResponse, 
  NextOfKin, 
  EmergencyContact, 
  MedicalHistory, 
  PrimaryDoctor 
} from "@/lib/types/digibook";
import { revalidatePath } from "next/cache";
import { createSupabaseServerAdminClient } from "../client";
import { createClient } from "@supabase/supabase-js";

// Helper function to safely convert comma-separated strings to arrays
const stringToArray = (str: string | undefined): string[] | undefined => {
  if (!str || str.trim() === '') return undefined;
  return str
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);
};

// Helper function to create contact objects safely
const createContact = (name?: string, phone?: string, relationship?: string): NextOfKin | EmergencyContact | undefined => {
  if (!name && !phone) return undefined;
  return { name: name || '', phone: phone || '', relationship: relationship || '' };
};

// Helper function to create medical history object
const createMedicalHistory = (
  pastVisits?: string, 
  surgeries?: string, 
  familyHistory?: string
): MedicalHistory | undefined => {
  if (!pastVisits && !surgeries && !familyHistory) return undefined;
  return {
    past_visits: pastVisits,
    surgeries: surgeries,
    family_history: familyHistory
  };
};

// Helper function to create primary doctor object
const createPrimaryDoctor = (name?: string, contact?: string): PrimaryDoctor | undefined => {
  if (!name && !contact) return undefined;
  return { name, contact };
};

export async function saveOnboardingData(formData: DigibookFormData): Promise<ApiResponse> {
  try {
    // 1. Authenticate the user
    const { userId,  } = await auth();
    console.log("user id is:", userId)
    
    if (!userId ) {
      return { 
        success: false, 
        error: "Authentication failed. Please sign in to continue." 
      };
    }

    // 2. Get user email
    const userEmail = "testing@gmail.com"
    
    if (!userEmail) {
      return { 
        success: false, 
        error: "No email address found for user account." 
      };
    }

    // 3. Validate required fields
    if (!formData.full_name || formData.full_name.trim() === '') {
      return { 
        success: false, 
        error: "Full name is required." 
      };
    }

    // 4. Create Supabase admin client
    const supabase = createSupabaseServerAdminClient();

    // 5. Prepare profile data
    const profileData = {
      clerk_id: userId,
      email: userEmail,
      full_name: formData.full_name.trim(),
      onboarding_complete: true,
    };

    // 6. Prepare digibook data with proper transformations
    const digibookData = {
      clerk_user_id: userId,
      email: userEmail,
      
      // Personal Information
      full_name: formData.full_name.trim(),
      date_of_birth: formData.date_of_birth || null,
      gender: formData.gender || null,
      phone_number: formData.phone_number || null,
      home_address: formData.home_address || null,
      
      // Emergency Contacts
      next_of_kin: createContact(
        formData.next_of_kin_name,
        formData.next_of_kin_phone,
        formData.next_of_kin_relationship
      ),
      emergency_contact: createContact(
        formData.emergency_contact_name,
        formData.emergency_contact_phone,
        formData.emergency_contact_relationship
      ),
      
      // Medical Information
      blood_type: formData.blood_type || null,
      allergies_text: formData.allergies || null,
      existing_conditions: stringToArray(formData.existing_conditions),
      medical_history: createMedicalHistory(
        formData.past_hospital_visits,
        formData.surgeries,
        formData.family_medical_history
      ),
      current_medications_text: formData.current_medications || null,
      
      // Healthcare Preferences
      primary_doctor: createPrimaryDoctor(
        formData.primary_doctor_name,
        formData.primary_doctor_contact
      ),
      preferred_hospital: formData.preferred_hospital || null,
      preferred_language: formData.preferred_language || null,
      preferred_department: formData.preferred_department || null,
      accessibility_needs: stringToArray(formData.accessibility_needs),
      
      // Insurance Information
      insurance_provider: formData.insurance_provider || null,
      insurance_policy_number: formData.insurance_policy_number || null,
      insurance_contact_info: formData.insurance_contact_info || null,
      
      // Consent Settings
      consent_share_records: formData.consent_share_records ?? false,
      consent_notifications: formData.consent_notifications ?? false,
      consent_emergency_access: formData.consent_emergency_access ?? false,
    };

    // 7. Start database transaction
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert(profileData, { 
        onConflict: 'clerk_id',
        ignoreDuplicates: false 
      });

    if (profileError) {
      console.error('Profile upsert error:', profileError);
      return { 
        success: false, 
        error: `Failed to save profile: ${profileError.message}` 
      };
    }

    const { error: digibookError } = await supabase
      .from('digibooks')
      .upsert(digibookData, { 
        onConflict: 'clerk_user_id',
        ignoreDuplicates: false 
      });

    if (digibookError) {
      console.error('Digibook upsert error:', digibookError);
      return { 
        success: false, 
        error: `Failed to save health record: ${digibookError.message}` 
      };
    }

    // 8. Revalidate relevant paths
    revalidatePath('/dashboard');
    revalidatePath('/digibook');

    console.log(`✅ Successfully saved digibook for user ${userId}`);
    
    return { 
      success: true, 
      data: { 
        message: "Health record saved successfully!",
        userId: userId 
      } 
    };

  } catch (error: any) {
    console.error('Server Action Error:', error);
    return { 
      success: false, 
      error: error.message || "An unexpected error occurred. Please try again." 
    };
  }
}

// Additional helper action to check if user has a digibook
export async function getUserDigibook(): Promise<ApiResponse> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return { success: false, error: "Not authenticated" };
    }

    const supabase = createSupabaseServerAdminClient();
    
    const { data, error } = await supabase
      .from('digibooks')
      .select('*')
      .eq('clerk_user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
      return { success: false, error: error.message };
    }

    return { 
      success: true, 
      data: data || null 
    };

  } catch (error: any) {
    console.error('Get digibook error:', error);
    return { 
      success: false, 
      error: error.message || "Failed to fetch health record" 
    };
  }
}

// Action to update existing digibook
export async function updateDigibook(formData: DigibookFormData): Promise<ApiResponse> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return { success: false, error: "Not authenticated" };
    }

    const supabase = createSupabaseServerAdminClient();

    // Check if digibook exists
    const { data: existing } = await supabase
      .from('digibooks')
      .select('id')
      .eq('clerk_user_id', userId)
      .single();

    if (!existing) {
      return { success: false, error: "Health record not found" };
    }

    // Prepare update data (similar to create but without required fields check)
    const updateData = {
      full_name: formData.full_name?.trim(),
      date_of_birth: formData.date_of_birth,
      gender: formData.gender,
      phone_number: formData.phone_number,
      home_address: formData.home_address,
      next_of_kin: createContact(
        formData.next_of_kin_name,
        formData.next_of_kin_phone,
        formData.next_of_kin_relationship
      ),
      emergency_contact: createContact(
        formData.emergency_contact_name,
        formData.emergency_contact_phone,
        formData.emergency_contact_relationship
      ),
      blood_type: formData.blood_type,
      allergies_text: formData.allergies,
      existing_conditions: stringToArray(formData.existing_conditions),
      medical_history: createMedicalHistory(
        formData.past_hospital_visits,
        formData.surgeries,
        formData.family_medical_history
      ),
      current_medications_text: formData.current_medications,
      primary_doctor: createPrimaryDoctor(
        formData.primary_doctor_name,
        formData.primary_doctor_contact
      ),
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
    };

    const { error } = await supabase
      .from('digibooks')
      .update(updateData)
      .eq('clerk_user_id', userId);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/dashboard');
    revalidatePath('/digibook');

    return { success: true, data: { message: "Health record updated successfully!" } };

  } catch (error: any) {
    console.error('Update digibook error:', error);
    return { success: false, error: error.message || "Failed to update health record" };
  }
}

// ... (keep your existing getUserDigibook and other actions)


// NEW SERVER ACTION for updating a single field
export async function updateDigibookField({
  field,
  value,
}: {
  field: string;
  value: any;
}) {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Authentication failed." };
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // A simple whitelist to prevent updating protected fields like 'id' or 'clerk_user_id'
  const allowedFields = [
    "full_name", "date_of_birth", "gender", "phone_number", "home_address",
    "emergency_contact", "blood_type", "allergies_text", "existing_conditions",
    "medical_history", "current_medications_text", "primary_doctor", "preferred_hospital",
    "preferred_language", "preferred_department", "accessibility_needs", "insurance_provider",
    "insurance_policy_number", "insurance_contact_info"
  ];
  
  if (!allowedFields.includes(field)) {
      return { success: false, error: "Invalid field specified for update." };
  }

  try {
    const { error } = await supabase
      .from("digibooks")
      .update({ [field]: value, updated_at: new Date().toISOString() })
      .eq("id", userId);

    if (error) throw error;

    // Revalidate the path to ensure the UI updates with fresh data on navigation
    revalidatePath("/book");
    revalidatePath("/"); // also revalidate dashboard if needed

    return { success: true, message: `${field.replace(/_/g, ' ')} updated successfully.` };
  } catch (error: any) {
    console.error("Update Digibook Field Error:", error);
    return { success: false, error: error.message };
  }
}