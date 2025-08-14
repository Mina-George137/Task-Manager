import Joi from "joi";
import { VALIDATION_MESSAGES,PASSWORD_REGEX } from "../modules/Statics/staticStrings.js";

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages({
        "string.empty":VALIDATION_MESSAGES.FULLNAME_REQUIRED ,
        "string.min": VALIDATION_MESSAGES.FULLNAME_MINLEN,
        "string.max":VALIDATION_MESSAGES.FULLNAME_MAXLEN 
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.email": VALIDATION_MESSAGES.EMAIL_INVALID,
        "string.empty": VALIDATION_MESSAGES.EMAIL_REQUIRED
      }),
    password: Joi.string()
      .pattern(new RegExp(PASSWORD_REGEX))
      .required()
      .messages({
        "string.pattern.base": VALIDATION_MESSAGES.PASSWORD_INVALID,
        "string.empty": VALIDATION_MESSAGES.PASSWORD_REQUIRED
      })
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", errors });
  }
  next();
};

const signinValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.email": VALIDATION_MESSAGES.EMAIL_INVALID,
        "string.empty": VALIDATION_MESSAGES.EMAIL_REQUIRED
      }),
    password: Joi.string()
      .pattern(new RegExp(PASSWORD_REGEX))
      .required()
      .messages({
        "string.pattern.base": VALIDATION_MESSAGES.PASSWORD_INVALID,
        "string.empty": VALIDATION_MESSAGES.PASSWORD_REQUIRED
      })
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", errors });
  }
  next();
};

export {signupValidation,signinValidation}