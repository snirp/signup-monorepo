const hello = "Hello world";

export default hello;

interface Feedback {
  error: string;
  valid: boolean;
}

type Validator = (input: string) => Feedback;

export const min =
  (val: number): Validator =>
  (input) => ({
    valid: input.length >= val,
    error: `Should contain at least ${val} characters`,
  });

export const max =
  (val: number): Validator =>
  (input) => ({
    valid: input.length <= val,
    error: `Should contain at most ${val} characters`,
  });

export const hasUpper: Validator = (input) => ({
  valid: /[A-Z|Ç|Ş|Ğ|Ö|Ü|İ]/u.test(input),
  error: "Should contain an uppercase letter",
});

export const hasLower: Validator = (input) => ({
  valid: /[a-z|ç|ş|ğ|ö|ü|ı]/u.test(input),
  error: "Should contain a lowercase letter",
});

export const hasNumber: Validator = (input) => ({
  valid: /[0-9]/.test(input),
  error: "Should contain a number",
});

export const email: Validator = (input) => ({
  valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input),
  error: "Please enter a valid email address",
});

export const validation =
  (...fs: Validator[]) =>
  (input: string) =>
    fs.map((f) => f(input));

// Some ready made validators
export const passwordValidation = validation(
  min(8),
  hasUpper,
  hasLower,
  hasNumber
);
export const emailValidation = validation(max(256), email);
