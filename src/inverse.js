function inverse(a, mod) {
  return quickPow(a, mod - 2, mod) % mod
}

function quickPow(a, b, p = mod) {
  let ans = 1;
  a = (a % p + p) % p;
  for (; b; b >>= 1) {
    if (b & 1) ans = (a * ans) % p;
    a = (a * a) % p;
  }
  return ans;
}
