export const VALIDATION_MESSAGES = {
  FULLNAME_REQUIRED: "Full name is required",
  FULLNAME_MINLEN: "Full name must be at least 3 characters",
  FULLNAME_MAXLEN: "Full name must be less than 50 characters",
  EMAIL_INVALID: "Invalid email format",
  EMAIL_REQUIRED: "Email is required",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_INVALID:
    "Password must be at least 8 characters, include one letter, one number, and one special character",
};

export const PASSWORD_REGEX = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&_]).{8,}$";
export const INVALID_TOKEN = "Invalid or expired token";
export const NO_TOKEN = "No token provided";

