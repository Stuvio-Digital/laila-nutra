import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters long'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  companyName: z.string().min(1, 'Company name is required'),
  supportType: z.enum(['Product', 'General Enquiry'] as const, {
    message: 'Please select a service type',
  }),
  message: z.string().optional(),
  terms: z.literal(true, {
    message: 'You must agree to the terms and conditions',
  }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
