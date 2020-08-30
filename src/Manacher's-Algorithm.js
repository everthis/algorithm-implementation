function manachersAlgorithm(s, N) {
  let str = getModifiedString(s, N)
  let len = 2 * N + 1
  const P = new Array(len).fill(0)
  let c = 0 //stores the center of the longest palindromic substring until now
  let r = 0 //stores the right boundary of the longest palindromic substring until now
  let maxLen = 0
  for (let i = 0; i < len; i++) {
    //get mirror index of i
    let mirror = 2 * c - i
    //see if the mirror of i is expanding beyond the left boundary of current longest palindrome at center c
    //if it is, then take r - i as P[i]
    //else take P[mirror] as P[i]
    if (i < r) {
      P[i] = Math.min(r - i, P[mirror])
    }

    //expand at i
    let a = i + (1 + P[i])
    let b = i - (1 + P[i])
    while (a < len && b >= 0 && str.charAt(a) === str.charAt(b)) {
      P[i]++
      a++
      b--
    }

    //check if the expanded palindrome at i is expanding beyond the right boundary of current longest palindrome at center c
    //if it is, the new center is i
    if (i + P[i] > r) {
      c = i
      r = i + P[i]

      if (P[i] > maxLen) {
        //update maxlen
        maxLen = P[i]
      }
    }
  }
  return maxLen
}

function getModifiedString(s, N) {
  let sb = ''
  for (let i = 0; i < N; i++) {
    sb += '#'
    sb += s.charAt(i)
  }
  sb += '#'
  return sb
}

