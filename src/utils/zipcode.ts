const ZIP_REGEX = /^\d{5}$/;

export function getValidSearchZipcode(searchZipcode: string) {
  const trimmedZipcode = searchZipcode.trim();
  return ZIP_REGEX.test(trimmedZipcode) ? trimmedZipcode : null;
}
