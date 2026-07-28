// app/lib/validation.ts

/**
 * Basic client-side string validations (Zod-free lightweight alternative)
 */

export function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

export function validatePassword(password: string): boolean {
  if (password.length < 12) return false;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  return hasUppercase && hasNumber && hasSpecial;
}

export function validatePhone(phone: string): boolean {
  // basic validation for optional phone (+44 prefix)
  if (!phone) return true;
  return /^\+44\d{9,11}$/.test(phone);
}
