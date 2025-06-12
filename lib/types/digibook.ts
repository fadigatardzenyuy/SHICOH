// lib/types/digibook.ts

export interface NextOfKin {
    name: string;
    relationship: string;
    phone: string;
  }
  
  export interface EmergencyContact {
    name: string;
    phone: string;
    relationship: string;
  }
  
  export interface MedicalHistory {
    past_visits?: string;
    surgeries?: string;
    family_history?: string;
  }
  
  export interface PrimaryDoctor {
    name?: string;
    contact?: string;
  }
  
  export interface Profile {
    id?: string;
    clerk_id: string;
    email: string;
    full_name?: string;
    onboarding_complete?: boolean;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface Digibook {
    id?: string;
    clerk_user_id: string;
    email: string;
    
    // Personal Information
    full_name: string;
    date_of_birth?: string;
    gender?: string;
    phone_number?: string;
    home_address?: string;
    
    // Emergency Contacts
    next_of_kin?: NextOfKin;
    emergency_contact?: EmergencyContact;
    
    // Medical Information
    blood_type?: string;
    allergies_text?: string;
    existing_conditions?: string[];
    medical_history?: MedicalHistory;
    current_medications_text?: string;
    
    // Healthcare Preferences
    primary_doctor?: PrimaryDoctor;
    preferred_hospital?: string;
    preferred_language?: string;
    preferred_department?: string;
    accessibility_needs?: string[];
    
    // Insurance Information
    insurance_provider?: string;
    insurance_policy_number?: string;
    insurance_contact_info?: string;
    
    // Consent Settings
    consent_share_records?: boolean;
    consent_notifications?: boolean;
    consent_emergency_access?: boolean;
    
    // Timestamps
    created_at?: string;
    updated_at?: string;
  }
  
  // Form validation types (what comes from the frontend)
  export interface DigibookFormData {
    // Personal Information
    full_name: string;
    date_of_birth?: string;
    gender?: string;
    phone_number?: string;
    home_address?: string;
    
    // Emergency Contacts
    next_of_kin_name?: string;
    next_of_kin_relationship?: string;
    next_of_kin_phone?: string;
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
    emergency_contact_relationship?: string;
    
    // Medical Information
    blood_type?: string;
    allergies?: string;
    existing_conditions?: string; // Comma-separated string
    past_hospital_visits?: string;
    surgeries?: string;
    family_medical_history?: string;
    current_medications?: string;
    
    // Healthcare Preferences
    primary_doctor_name?: string;
    primary_doctor_contact?: string;
    preferred_hospital?: string;
    preferred_language?: string;
    preferred_department?: string;
    accessibility_needs?: string; // Comma-separated string
    
    // Insurance Information
    insurance_provider?: string;
    insurance_policy_number?: string;
    insurance_contact_info?: string;
    
    // Consent Settings
    consent_share_records?: boolean;
    consent_notifications?: boolean;
    consent_emergency_access?: boolean;
  }
  
  // API Response types
  export interface ApiResponse<T = any> {
    success: boolean;
    error?: string;
    data?: T;
  }
  
  // Database insert/update types
  export type DigibookInsert = Omit<Digibook, 'id' | 'created_at' | 'updated_at'>;
  export type DigibookUpdate = Partial<DigibookInsert>;
  export type ProfileInsert = Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
  export type ProfileUpdate = Partial<ProfileInsert>;