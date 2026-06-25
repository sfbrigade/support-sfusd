const STRICT_EMAIL_REGEX =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;

export function isStrictEmail(emailInput: string): boolean {
  return STRICT_EMAIL_REGEX.test(emailInput);
}
