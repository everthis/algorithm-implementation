
/**
 * @param {string} a 
 * @param {string} b
 * @return {string}
 */
function multiply(a, b) {
  // your code here
  const aNeg = a.startsWith('-'), bNeg = b.startsWith('-')
  const symbol = aNeg || bNeg ? ((aNeg && bNeg) ? '' : '-') : ''
  a = aNeg ? a.slice(1) : a
  b = bNeg ? b.slice(1) : b
  const m = a.length, n = b.length
  const arr = Array(m + n).fill(0)
  const int = (s) => +s

  for(let i = m - 1; i>=0; i--) {
    for(let j = n - 1;j >= 0; j--) {
      const idx = i + j + 1
      const nxt = i + j
      const tmp = int(a[i]) * int(b[j]) + arr[idx]
      arr[idx] = tmp % 10
      arr[nxt] += Math.floor(tmp / 10)
    }
  }
  while(arr[0] === 0) {
    arr.shift()
  }

  return `${symbol}${arr.join('')}`
}

multiply(
  '1123456787654323456789', 
  '1234567887654323456'
)
// '1386983673205309924427166592431045142784'
