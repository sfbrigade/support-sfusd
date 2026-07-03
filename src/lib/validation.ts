const STRICT_EMAIL_REGEX =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;

export function isStrictEmail(emailInput: string): boolean {
  return STRICT_EMAIL_REGEX.test(emailInput);
}

export function sanitizeName(nameInput: string): string {
  return nameInput
    .split("")
    .map((character) => {
      const characterCode = character.charCodeAt(0);
      return characterCode <= 31 || characterCode === 127 ? " " : character;
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100);
}
