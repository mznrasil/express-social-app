import { ValidationError } from "class-validator";

export const formatValidationError = (errors: ValidationError[]) => {
  return Object.values(errors?.[0].constraints)?.[0];
};
