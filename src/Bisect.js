// https://github.com/python/cpython/blob/3.9/Lib/bisect.py
function Bisect() {
  return { insort_right, insort_left, bisect_left, bisect_right }
  function insort_right(a, x, lo = 0, hi = null) {
    lo = bisect_right(a, x, lo, hi)
    a.splice(lo, 0, x)
  }
  function bisect_right(a, x, lo = 0, hi = null) {
    if (lo < 0) throw new Error('lo must be non-negative')
    if (hi == null) hi = a.length
    while (lo < hi) {
      let mid = (lo + hi) >> 1
      x < a[mid] ? (hi = mid) : (lo = mid + 1)
    }
    return lo
  }
  function insort_left(a, x, lo = 0, hi = null) {
    lo = bisect_left(a, x, lo, hi)
    a.splice(lo, 0, x)
  }
  function bisect_left(a, x, lo = 0, hi = null) {
    if (lo < 0) throw new Error('lo must be non-negative')
    if (hi == null) hi = a.length
    while (lo < hi) {
      let mid = (lo + hi) >> 1
      a[mid] < x ? (lo = mid + 1) : (hi = mid)
    }
    return lo
  }
}
