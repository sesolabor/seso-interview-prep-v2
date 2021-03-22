export function isNumeric(str: any): boolean {
  return !isNaN(str) && !isNaN(parseFloat(str));
}
