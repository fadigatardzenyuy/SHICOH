// utils/validation.ts
import { z } from 'zod';

// Step 1: Personal Information
export const step1Schema = z.object({
    full_name: z.string().min(3, "Full name is required"),
    date_of_birth: z.string().nonempty("Date of birth is required"),
    gender: z.string().nonempty("Please select a gender"),
    phone_number: z.string().min(10, "A valid phone number is required"),
});

// Step 2: Emergency Information
export const step2Schema = z.object({
    emergency_contact_name: z.string().min(3, "Contact name is required"),
    emergency_contact_phone: z.string().min(10, "Contact phone is required"),
    emergency_contact_relationship: z.string().nonempty("Relationship is required"),
    blood_type: z.string().optional(),
    allergies: z.string().optional(), // We'll handle multiple entries in the component
});

// Step 3: Medical History (Example for one visit)
export const step3Schema = z.object({
    // In a real app, you'd handle dynamic lists here. For simplicity, we'll keep it basic.
    past_hospital_visits: z.string().optional(),
    surgeries: z.string().optional(),
});

// Step 4: Current Health Profile
export const step4Schema = z.object({
    current_medications: z.string().optional(),
    primary_doctor_name: z.string().optional(),
});

// Step 5: Preferences & Accessibility
export const step5Schema = z.object({
    preferred_hospital: z.string().optional(),
    preferred_language: z.string().optional(),
    preferred_days: z.string().optional(),
    preferred_times: z.string().optional(),
    preferred_locations: z.string().optional(),
});

// Step 6: Insurance & Payment
export const step6Schema = z.object({
    insurance_provider: z.string().nonempty("Provider name is required"),
    insurance_policy_number: z.string().nonempty("Policy number is required"),
});

// Step 7: Consent & Notifications
export const step7Schema = z.object({
    consent_share_records: z.boolean(),
    consent_notifications: z.boolean(),
    consent_emergency_access: z.boolean().refine(val => val === true, {
        message: "You must consent to emergency access to complete setup.",
    }),
});

// Combine all schemas into an array for easy access
export const allSchemas = [
    step1Schema,
    step2Schema,
    step3Schema,
    step4Schema,
    step5Schema,
    step6Schema,
    step7Schema,
];