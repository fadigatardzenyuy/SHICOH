// lib/supabase/client.ts

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { auth } from "@clerk/nextjs/server";

// Type for our database schema
export interface Database {
  public: {
    Tables: {
      // --- UPDATED 'profiles' TABLE SCHEMA ---
      profiles: {
        Row: {
          id: string;
          clerk_id: string;
          email: string;
          full_name: string | null;
          onboarding_complete: boolean;
          isAdmin: boolean | null; // <-- ADDED
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          clerk_id: string;
          email: string;
          full_name?: string | null;
          onboarding_complete?: boolean;
          isAdmin?: boolean | null; // <-- ADDED
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          clerk_id?: string;
          email?: string;
          full_name?: string | null;
          onboarding_complete?: boolean;
          isAdmin?: boolean | null; // <-- ADDED
          created_at?: string;
          updated_at?: string;
        };
      };
      
      digibooks: {
        Row: {
          id: string;
          clerk_user_id: string;
          email: string;
          full_name: string;
          date_of_birth: string | null;
          gender: string | null;
          phone_number: string | null;
          home_address: string | null;
          next_of_kin: any | null;
          emergency_contact: any | null;
          blood_type: string | null;
          allergies_text: string | null;
          existing_conditions: string[] | null;
          medical_history: any | null;
          current_medications_text: string | null;
          primary_doctor: any | null;
          preferred_hospital: string | null;
          preferred_language: string | null;
          preferred_department: string | null;
          accessibility_needs: string[] | null;
          insurance_provider: string | null;
          insurance_policy_number: string | null;
          insurance_contact_info: string | null;
          consent_share_records: boolean;
          consent_notifications: boolean;
          consent_emergency_access: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          clerk_user_id: string;
          email: string;
          full_name: string;
          date_of_birth?: string | null;
          gender?: string | null;
          phone_number?: string | null;
          home_address?: string | null;
          next_of_kin?: any | null;
          emergency_contact?: any | null;
          blood_type?: string | null;
          allergies_text?: string | null;
          existing_conditions?: string[] | null;
          medical_history?: any | null;
          current_medications_text?: string | null;
          primary_doctor?: any | null;
          preferred_hospital?: string | null;
          preferred_language?: string | null;
          preferred_department?: string | null;
          accessibility_needs?: string[] | null;
          insurance_provider?: string | null;
          insurance_policy_number?: string | null;
          insurance_contact_info?: string | null;
          consent_share_records?: boolean;
          consent_notifications?: boolean;
          consent_emergency_access?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          clerk_user_id?: string;
          email?: string;
          full_name?: string;
          date_of_birth?: string | null;
          gender?: string | null;
          phone_number?: string | null;
          home_address?: string | null;
          next_of_kin?: any | null;
          emergency_contact?: any | null;
          blood_type?: string | null;
          allergies_text?: string | null;
          existing_conditions?: string[] | null;
          medical_history?: any | null;
          current_medications_text?: string | null;
          primary_doctor?: any | null;
          preferred_hospital?: string | null;
          preferred_language?: string | null;
          preferred_department?: string | null;
          accessibility_needs?: string[] | null;
          insurance_provider?: string | null;
          insurance_policy_number?: string | null;
          insurance_contact_info?: string | null;
          consent_share_records?: boolean;
          consent_notifications?: boolean;
          consent_emergency_access?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      // --- NEW 'consultations' TABLE SCHEMA ---
      consultations: {
        Row: {
          id: string;
          user_id: string | null; // Foreign key to profiles.id
          doctor_name: string | null;
          patient_email: string | null;
          patient_phone_number: string | null;
          complaint: string | null;
          consultation_items: any | null; // JSONB column
          summary_notes: string | null;
          total_fee: number | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          doctor_name?: string | null;
          patient_email?: string | null;
          patient_phone_number?: string | null;
          complaint?: string | null;
          consultation_items?: any | null;
          summary_notes?: string | null;
          total_fee?: number | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          doctor_name?: string | null;
          patient_email?: string | null;
          patient_phone_number?: string | null;
          complaint?: string | null;
          consultation_items?: any | null;
          summary_notes?: string | null;
          total_fee?: number | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

// Client-side Supabase client (uses RLS)
export function createSupabaseClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Server-side admin client (bypasses RLS - use carefully!)
export function createSupabaseServerAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Missing Supabase environment variables for admin client');
  }

  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    }
  });
}

// Server-side client with user authentication
export async function createSupabaseServerClient() {
  const authResult = auth();
  const token = await authResult.getToken({ template: 'supabase' });
  
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
    }
  );

  return supabase;
}