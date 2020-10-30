const numToBinStr = n => (n >>> 0).toString(2)
const isPowerOfTwo = num => (num & (num - 1)) === 0
