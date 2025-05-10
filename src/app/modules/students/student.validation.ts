import { z } from 'zod';

export const studentValidationSchema = z.object({
  id: z.string().trim().min(1, 'ID is required'),
  password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters.')
    .max(20, 'Password can not be more than 20 characters.'),
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Invalid email address'),
  photo: z.string().trim().url('Photo must be a valid URL'),
  role: z.enum(['student', 'instructor', 'admin']).default('student'),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
});

export default studentValidationSchema;
export type TStudentValidation = z.infer<typeof studentValidationSchema>;
