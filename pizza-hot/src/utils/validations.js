export function isEmail(value) {
  var re = /\S+@\S+\.\S+/;
  return re.test(value);
}

export function isNotEmpty(value) {
  return value.trim();
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function isPhoneNumber(value) {
  return !isNaN(value) && Number.isInteger(Number(value));
}
export function NotHasNumber(value) {
  var re = /^[a-zA-ZğüşöçİĞÜŞÖÇ\s]+$/;
  return typeof value === "string" && re.test(value);
}
