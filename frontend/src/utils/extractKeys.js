export function extractKeys(obj, prefix = "") {
  let keys = [];

  if (Array.isArray(obj)) {
    obj = obj[0]; // extract keys from first object for arrays
  }

  for (let key in obj) {
    const path = prefix ? `${prefix}.${key}` : key;

    if (typeof obj[key] === "object" && obj[key] !== null) {
      keys.push(...extractKeys(obj[key], path));
    } else {
      keys.push(path);
    }
  }

  return keys;
}
