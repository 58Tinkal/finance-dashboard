export function extractKeys(obj, prefix = "") {
  let keys = [];
  for (let k in obj) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (typeof obj[k] === "object" && obj[k] !== null) {
      keys.push(...extractKeys(obj[k], path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}
