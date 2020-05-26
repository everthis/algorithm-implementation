# Algorithm Implementation
Algorithm Implementation.

## Knuth–Morris–Pratt algorithm(KMP algorithm)

<details>
  <summary>Knuth–Morris–Pratt algorithm implementation</summary>

```js
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
```

</details>

[LeetCode-1392.Longest Happy Prefix](https://leetcode.com/problems/longest-happy-prefix/)


## Binary Indexed Tree(BIT)

<details>
  <summary>Binary Indexed Tree implementation</summary>

```js
const lowBit = x => x & (-x)
class FenwickTree {
  constructor(n) {
    if(n < 1) return
    this.sum = Array(n + 1).fill(0)
  }
  update(i, delta) {
    if(i < 1) return
    while(i < this.sum.length) {
      this.sum[i] += delta
      i += lowBit(i) 
    }
  }
  query(i) {
    if(i < 1) return
    let sum = 0
    while(i > 0) {
      sum += this.sum[i]
      i -= lowBit(i)
    }
    return sum
  }
}
```
</details>


[LeetCode-307.Range Sum Query - Mutable](https://leetcode.com/problems/range-sum-query-mutable/)

## Union-Find(Disjoint Set)

<details>
  <summary>Union-Find implementation</summary>
  
```js
class UnionFind {
  constructor(n) {
    this.parents = Array(n)
      .fill(0)
      .map((e, i) => i + 1)
    this.ranks = Array(n).fill(0)
  }
  root(x) {
    while(x !== this.parents[x]) {
      this.parents[x] = this.parents[this.parents[x]]
      x = this.parents[x]
    }
    return x
  }
  find(x) {
    // if (x !== this.parents[x]) this.parents[x] = this.find(this.parents[x])
    // return this.parents[x]
    return this.root(x)
  }
  check(x, y) {
    return this.root(x) === this.root(y)
  }
  union(x, y) {
    const [rx, ry] = [this.find(x), this.find(y)]
    if (this.ranks[rx] >= this.ranks[ry]) {
      this.parents[ry] = rx
      this.ranks[rx] += this.ranks[ry]
    } else if (this.ranks[ry] > this.ranks[rx]) {
      this.parents[rx] = ry
      this.ranks[ry] += this.ranks[rx]
    }
  }
}

```
</details>

## PriorityQueue

<details>
  <summary>PriorityQueue implementation</summary>

```js
class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this.heap = []
    this.top = 0
    this.comparator = comparator
  }
  size() {
    return this.heap.length
  }
  isEmpty() {
    return this.size() === 0
  }
  peek() {
    return this.heap[this.top]
  }
  push(...values) {
    values.forEach((value) => {
      this.heap.push(value)
      this.siftUp()
    })
    return this.size()
  }
  pop() {
    const poppedValue = this.peek()
    const bottom = this.size() - 1
    if (bottom > this.top) {
      this.swap(this.top, bottom)
    }
    this.heap.pop()
    this.siftDown()
    return poppedValue
  }
  replace(value) {
    const replacedValue = this.peek()
    this.heap[this.top] = value
    this.siftDown()
    return replacedValue
  }

  parent = (i) => ((i + 1) >>> 1) - 1
  left = (i) => (i << 1) + 1
  right = (i) => (i + 1) << 1
  greater = (i, j) => this.comparator(this.heap[i], this.heap[j])
  swap = (i, j) => ([this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]])
  siftUp = () => {
    let node = this.size() - 1
    while (node > this.top && this.greater(node, this.parent(node))) {
      this.swap(node, this.parent(node))
      node = this.parent(node)
    }
  }
  siftDown = () => {
    let node = this.top
    while (
      (this.left(node) < this.size() && this.greater(this.left(node), node)) ||
      (this.right(node) < this.size() && this.greater(this.right(node), node))
    ) {
      let maxChild =
        this.right(node) < this.size() &&
        this.greater(this.right(node), this.left(node))
          ? this.right(node)
          : this.left(node)
      this.swap(node, maxChild)
      node = maxChild
    }
  }
}
```
</details>

## Quicksort
<details>
  <summary>Quicksort implementation</summary>
  
```js
function Quicksort(arr, start, end) {
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

```
</details>

## Mergesort

<details>
  <summary>Mergesort implementation</summary>

```js
// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
function merge(arr, l, m, r) {
  let i, j, k
  const n1 = m - l + 1
  const n2 = r - m

  /* create temp arrays */
  const L = Array(n1).fill(0)
  const R = Array(n2).fill(0)

  /* Copy data to temp arrays L[] and R[] */
  for (i = 0; i < n1; i++) L[i] = arr[l + i]
  for (j = 0; j < n2; j++) R[j] = arr[m + 1 + j]

  /* Merge the temp arrays back into arr[l..r]*/
  i = 0 // Initial index of first subarray
  j = 0 // Initial index of second subarray
  k = l // Initial index of merged subarray
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i]
      i++
    } else {
      arr[k] = R[j]
      j++
    }
    k++
  }

  /* Copy the remaining elements of L[], if there 
       are any */
  while (i < n1) {
    arr[k] = L[i]
    i++
    k++
  }

  /* Copy the remaining elements of R[], if there 
       are any */
  while (j < n2) {
    arr[k] = R[j]
    j++
    k++
  }
}

/* l is for left index and r is right index of the 
   sub-array of arr to be sorted */
function mergeSort(arr, l, r) {
  if (l < r) {
    // Same as (l+r)/2, but avoids overflow for
    // large l and h
    const m = l + ((r - l) >> 1)
    // Sort first and second halves
    mergeSort(arr, l, m)
    mergeSort(arr, m + 1, r)
    merge(arr, l, m, r)
  }
}
```
</details>
