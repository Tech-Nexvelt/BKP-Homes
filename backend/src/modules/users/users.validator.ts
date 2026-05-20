import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).trim().optional(),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number').optional(),
  dob: z.string().datetime().optional(),
  avatar: z.string().url().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[0-9]/, 'Must contain a number'),
});

export const createAddressSchema = z.object({
  label: z.string().max(50).optional(),
  line1: z.string().min(5, 'Address line 1 is required'),
  line2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Pincode must be 6 digits'),
  country: z.string().default('India'),
});

export const updateAddressSchema = createAddressSchema.partial();

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type CreateAddressInput = z.infer<typeof createAddressSchema>;
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;
