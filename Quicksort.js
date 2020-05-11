function qs(arr, start, end) {
  if (start >= end) return
  const p = partition(arr, start, end)
  qs(arr, start, p)
  qs(arr, p + 1, end)
}

function swap(arr, i, j) {
  const tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

function compare(a, b) {
  return a - b
}

function partition(arr, start, end) {
  const pivot = arr[start]
  let s = start
  let e = end
  while (true) {
    while (arr[s] < pivot) {
      s++
    }
    while (pivot < arr[e]) {
      e--
    }
    if (s === e) {
      return s
    } else if (s > e) {
      return s - 1
    }
    swap(arr, s, e)
    s++
    e--
  }
}
