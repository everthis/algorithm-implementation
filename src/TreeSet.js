class TreeSet {
  constructor(comparator) {
    this.length = 0
    this.elements = []
    if (comparator) this.comparator = comparator
    else this.comparator = (a, b) => a > b ? 1 : (a < b ? -1 : 0)
  }
  size() {
    return this.elements.length
  }
  last() {
    return this.elements[this.length - 1]
  }
  first() {
    return this.elements[0]
  }
  isEmpty() {
    return this.size() === 0
  }
  pollLast() {
    if (this.length > 0) {
      this.length--
      return this.elements.splice(this.length, 1)
    }
    return null
  }
  pollFirst() {
    if (this.length > 0) {
      this.length--
      return this.elements.splice(0, 1)
    }
    return null
  }
  add(element) {
    let index = this.binarySearch(element)
    if(index >= 0) return
    index = -index - 1
    this.elements.splice(index, 0, element)
    this.length++
  }

  /**
   * Performs a binary search of value in array
   * @param {number[]} array - Array in which value will be searched. It must be sorted.
   * @param {number} value - Value to search in array
   * @return {number} If value is found, returns its index in array. Otherwise, returns
   *                  a negative number indicating where the value should be inserted: -(index + 1)
   */
  binarySearch(value) {
    let low = 0
    let high = this.elements.length - 1
    while (low <= high) {
      let mid = low + ((high - low) >>> 1)
      let midValue = this.elements[mid]
      let cmp = this.comparator(midValue, value)
      if (cmp < 0) low = mid + 1
      else if (cmp > 0) high = mid - 1
      else return mid
    }
    return -(low + 1)
  }
}

// another
// https://github.com/fukatani/TreeSet/blob/master/treeset.py
function TreeSet(elements) {
  let ts = []
  let se = new Set()
  let bisect = new Bisect()
  if (elements) addAll(elements)
  return { add, floor, ceiling, remove, contains, size, clear, toArray }
  function addAll(elements) {
    for (const e of elements) {
      if (se.has(e)) continue
      add(e)
      se.add(e)
    }
  }
  function add(e) {
    if (!se.has(e)) {
      bisect.insort_right(ts, e)
      se.add(e)
    }
  }
  function ceiling(e) {
    let idx = bisect.bisect_right(ts, e)
    if (ts[idx - 1] == e) return e
    return ts[bisect.bisect_right(ts, e)]
  }
  function floor(e) {
    let idx = bisect.bisect_left(ts, e)
    if (ts[idx] == e) {
      return e
    } else {
      return ts[bisect.bisect_left(ts, e) - 1]
    }
  }
  function remove(e) {
    ts = ts.filter((x) => x != e)
    se.delete(e)
  }
  function contains(e) {
    return se.has(e)
  }
  function size() {
    return ts.length
  }
  function clear() {
    ts = []
  }
  function toArray() {
    return ts
  }
}

// another

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
 function Bisect() {
  return { insort_right, insort_left, bisect_left, bisect_right }
  function insort_right(a, x, lo = 0, hi = null) {
      lo = bisect_right(a, x, lo, hi);
      a.splice(lo, 0, x);
  }
  function bisect_right(a, x, lo = 0, hi = null) {
      if (lo < 0) throw new Error('lo must be non-negative');
      if (hi == null) hi = a.length;
      while (lo < hi) {
          let mid = lo + hi >> 1;
          x < a[mid] ? hi = mid : lo = mid + 1;
      }
      return lo;
  }
  function insort_left(a, x, lo = 0, hi = null) {
      lo = bisect_left(a, x, lo, hi);
      a.splice(lo, 0, x);
  }
  function bisect_left(a, x, lo = 0, hi = null) {
      if (lo < 0) throw new Error('lo must be non-negative');
      if (hi == null) hi = a.length;
      while (lo < hi) {
          let mid = lo + hi >> 1;
          a[mid] < x ? lo = mid + 1 : hi = mid;
      }
      return lo;
  }
}

function TreeSet(elements) {
  let ts = [];
  let se = new Set();
  let bisect = new Bisect();
  if (elements) addAll(elements);
  return { add, floor, ceiling, lower, remove, contains, size, clear, toArray };
  function addAll(elements) {
      for (const e of elements) {
          if (se.has(e)) continue;
          add(e);
          se.add(e);
      }
  }
  function add(e) {
      if (!se.has(e)) {
          bisect.insort_right(ts, e);
          se.add(e);
      }
  }
  function ceiling(e) {
      let idx = bisect.bisect_right(ts, e);
      if (ts[idx - 1] == e) return e;
      return ts[bisect.bisect_right(ts, e)];
  }
  function floor(e) {
      let idx = bisect.bisect_left(ts, e);
      if (ts[idx] == e) {
          return e;
      } else {
          return ts[bisect.bisect_left(ts, e) - 1];
      }
  }
  function lower(e) {
      let idx = bisect.bisect_left(ts, e);
      if (ts[idx] < e) {
          return ts[idx];
      } else {
          return ts[bisect.bisect_left(ts, e) - 1];
      }
  }
  function remove(e) {
      let res = new Set(ts);
      res.delete(e);
      ts = [...res];
      se.delete(e);
  }
  function contains(e) {
      return se.has(e);
  }
  function size() {
      return ts.length;
  }
  function clear() {
      ts = [];
  }
  function toArray() {
      return ts;
  }
}
