// ✅ Validation Schemas using Zod
// ✅ TypeScript строгость согласно rules.json

import { z } from 'zod'

// ✅ User schemas
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email('Некорректный email'),
  role: z.enum(['executive', 'partner', 'client', 'crew', 'contractor']),
  profile: z.object({
    firstName: z.string().min(1, 'Имя обязательно'),
    lastName: z.string().min(1, 'Фамилия обязательна'),
    phone: z.string().optional(),
    avatar: z.string().url().optional(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateUserSchema = UserSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
})

export const UpdateUserSchema = CreateUserSchema.partial()

// ✅ Booking schemas
export const BookingSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  serviceType: z.enum(['helicopter', 'yacht', 'car', 'tour']),
  status: z.enum(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']),
  startDate: z.date(),
  endDate: z.date(),
  totalAmount: z.number().positive(),
  currency: z.string().default('RUB'),
  metadata: z.record(z.any()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateBookingSchema = BookingSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

// ✅ Auth schemas  
export const LoginSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
})

export const RegisterSchema = LoginSchema.extend({
  firstName: z.string().min(1, 'Имя обязательно'),
  lastName: z.string().min(1, 'Фамилия обязательна'),
  role: z.enum(['client', 'partner']).default('client'),
})

// ✅ CRM schemas
export const LeadSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Имя лида обязательно'),
  email: z.string().email('Некорректный email').optional(),
  phone: z.string().optional(),
  source: z.enum(['website', 'referral', 'social', 'direct', 'other']),
  status: z.enum(['new', 'contacted', 'qualified', 'proposal', 'won', 'lost']),
  value: z.number().positive().optional(),
  assignedTo: z.string().uuid().optional(),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateLeadSchema = LeadSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

// ✅ Export inferred types
export type User = z.infer<typeof UserSchema>
export type CreateUser = z.infer<typeof CreateUserSchema>
export type UpdateUser = z.infer<typeof UpdateUserSchema>
export type Booking = z.infer<typeof BookingSchema>
export type CreateBooking = z.infer<typeof CreateBookingSchema>
export type Login = z.infer<typeof LoginSchema>
export type Register = z.infer<typeof RegisterSchema>
export type Lead = z.infer<typeof LeadSchema>
export type CreateLead = z.infer<typeof CreateLeadSchema>

// ✅ Validation helper
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`)
    }
    throw error
  }
}