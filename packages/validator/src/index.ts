export interface Feedback {
  valid: boolean;
  message: string;
}

export type Validator = (input: string) => Feedback;

// All string validators
export const min =
  (val: number): Validator =>
  (input) => ({
    valid: input.length >= val,
    message: `Should contain at least ${val} characters`,
  });

export const max =
  (val: number): Validator =>
  (input) => ({
    valid: input.length <= val,
    message: `Should contain at most ${val} characters`,
  });

export const hasUpper: Validator = (input) => ({
  valid: /[A-Z|Ç|Ş|Ğ|Ö|Ü|İ]/u.test(input),
  message: "Should contain an uppercase letter",
});

export const hasLower: Validator = (input) => ({
  valid: /[a-z|ç|ş|ğ|ö|ü|ı]/u.test(input),
  message: "Should contain a lowercase letter",
});

export const hasNumber: Validator = (input) => ({
  valid: /[0-9]/.test(input),
  message: "Should contain a number",
});

export const email: Validator = (input) => ({
  valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input),
  message: "Please enter a valid email address",
});

export const freshEmail =
  (emails: string[]): Validator =>
  (input) => ({
    valid: !emails.includes(input),
    message: "This email address is already taken",
  });

export const validate =
  (...fs: Validator[]) =>
  (input: string) =>
    fs.map((f) => f(input));

// Some ready made validators
export const validatePassword = validate(min(8), hasUpper, hasLower, hasNumber);
export const validateEmail = validate(max(256), email);

export const isValid = (results: Feedback[]) =>
  results.every(({ valid }) => valid);

export const getErrors = (results: Feedback[]) =>
  results.filter(({ valid }) => !valid).map(({ message }) => message);
