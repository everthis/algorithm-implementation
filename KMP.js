function DFA(s) {
  let i = 1
  let j = 0
  const len = s.length
  const prefix = Array(len + 1).fill(0)
  prefix[0] = -1
  prefix[1] = 0
  while (i < len) {
    if (s[j] === s[i]) {
      j++
      i++
      prefix[i] = j
    } else {
      if (j > 0) j = prefix[j]
      else i++
    }
  }
  return prefix
}

function search(text, pattern) {
  let t = 0
  let p = 0
  const tLen = text.length
  const pLen = pattern.length
  const matches = []
  const prefix = DFA(pattern)
  while (t < tLen) {
    if (pattern[p] === text[t]) {
      p++
      t++
      if (p === pLen) {
        matches.push(t)
        p = prefix[p]
      }
    } else {
      p = prefix[p]
      if (p < 0) {
        t++
        p++
      }
    }
  }
  return matches
}
