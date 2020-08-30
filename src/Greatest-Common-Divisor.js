function GCD(a, b) {
  if (a === 0) return b
  if (b === 0) return a
  return GCD(Math.abs(a - b), Math.min(a, b))
}
