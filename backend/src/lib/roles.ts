import type { UserRole } from '../db/schema';

const VALID: readonly UserRole[] = ['customer', 'support', 'admin'];

export function parseRole(value: unknown): UserRole {
   if (typeof value === 'string' && (VALID as readonly string[]).includes(value)) {
      return value as UserRole
   }
   return 'customer'
}


export function isAdmin(role: unknown) {
   return role === 'admin'
}

export function isStaff(role: unknown) {
   return role === 'support' || role === 'admin'
}