export function equals(value1: any, value2: any): boolean {
  if (value1 === value2) return true;
  if (typeof value1 !== typeof value2) return false;
  if (value1 === null || value2 === null) return false;

  if (Array.isArray(value1) && Array.isArray(value2)) {
    if (value1.length !== value2.length) return false;
    return value1.every((item, index) => equals(item, value2[index]));
  }

  if (typeof value1 === "object") {
    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2 as object);
    if (keys1.length !== keys2.length) return false;
    return keys1.every((key) => equals(value1[key], value2[key]));
  }

  return false;
}
