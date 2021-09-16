function permutation (arr) {
  let start = 0
  let end = arr.length - 1
  let isEnd = false
  // try to find the first non-inc element A from back to front
  for (let i = end; i > 0; i--) {
    if (arr[i - 1] < arr[i]) {
      start = i - 1
      break
    } else if (i - 1 === 0) {
      isEnd = true
      break
    }
  }
  // already the last permutation, return
  if (isEnd) {
    return true
  }
  // find the first element larger than A from back to front, then swap them
  for (let i = end; i > start; i--) {
    if (arr[i] > arr[start]) {
      let temp = arr[i]
      arr[i] = arr[start]
      arr[start] = temp
      break
    }
  }
  // reverse all elements behind A
  start += 1
  while (start < end) {
    let temp = arr[start]
    arr[start] = arr[end]
    arr[end] = temp
    start += 1
    end -= 1
  }
  // not the last permutation
  return false
}

function nextPermutation (str, steps = 1) {
  if (isNaN(steps) || steps < 1) {
    throw Error('steps must be a valid number')
  }
  str += ''
  if (!str) {
    throw Error('str must be a valid string')
  }
  steps = parseInt(steps)
  let arr = str.split('')
  for (let i = 1; i <= steps; i++) {
    if (permutation(arr)) {
      break
    }
  }
  return arr.join('')
}
