import { z } from 'zod';

export const contactSchemaNew = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  businessEmail: z.string().min(1, 'Business email is required').email('Enter a valid email address'),
  company: z.string().min(1, 'Company / Organisation is required'),
  jobTitle: z.string().optional(),
  relationshipType: z.enum(['New Partnership Inquiry', 'Existing Client / Partner'] as const, {
    errorMap: () => ({ message: 'Please select one' }),
  }),
  areaOfInterest: z.enum([
    'Proprietary Ingredient Sourcing',
    'CDMO & Contract Manufacturing',
    'R&D & Co-Development',
    'Quality Assurance (QA)',
    'Regulatory & Compliance',
    'General / Other Inquiry'
  ] as const, {
    errorMap: () => ({ message: 'Please select one' }),
  }),
  region: z.enum([
    'North America (USA & Canada)',
    'Europe & United Kingdom',
    'Middle East & Africa',
    'India & South Asia',
    'Asia-Pacific (APAC)',
    'Latin America (LATAM)',
    'Other / Global'
  ] as const, {
    errorMap: () => ({ message: 'Please select your region' }),
  }),
  phoneCode: z.string().optional(),
  phone: z.string().min(1, 'Phone number is required').regex(/^\d+$/, 'Enter a valid phone number'),
  batchNumber: z.string().optional(),
  message: z.string().optional(),
});

export type ContactFormDataNew = z.infer<typeof contactSchemaNew>;
