function deepCopy(obj) {
  if (typeof obj !== "object" || obj === null) return obj;

  const copy = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }
  return copy;
}

deepCopy({ a: 1, b: { c: 2 } });
