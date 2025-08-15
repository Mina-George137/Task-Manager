export const isEmail = (email: string) => /\S+@\S+\.\S+/.test(email)

// Password: ≥ 8 chars, at least one letter, one number, one special character
export const isStrongPassword = (password: string) => {
  if (password.length < 8) return false
  const hasLetter = /[A-Za-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)
  return hasLetter && hasNumber && hasSpecial
}

export function required(v?: string) {
  return Boolean(v && v.trim().length > 0)
}