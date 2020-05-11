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
    this._heap = []
    this._comparator = comparator
  }
  size() {
    return this._heap.length
  }
  isEmpty() {
    return this.size() === 0
  }
  peek() {
    return this._heap[top]
  }
  push(...values) {
    values.forEach((value) => {
      this._heap.push(value)
      this._siftUp()
    })
    return this.size()
  }
  pop() {
    const poppedValue = this.peek()
    const bottom = this.size() - 1
    if (bottom > top) {
      this._swap(top, bottom)
    }
    this._heap.pop()
    this._siftDown()
    return poppedValue
  }
  replace(value) {
    const replacedValue = this.peek()
    this._heap[top] = value
    this._siftDown()
    return replacedValue
  }
  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j])
  }
  _swap(i, j) {
    ;[this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]]
  }
  _siftUp() {
    let node = this.size() - 1
    while (node > top && this._greater(node, parent(node))) {
      this._swap(node, parent(node))
      node = parent(node)
    }
  }
  _siftDown() {
    let node = top
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      let maxChild =
        right(node) < this.size() && this._greater(right(node), left(node))
          ? right(node)
          : left(node)
      this._swap(node, maxChild)
      node = maxChild
    }
  }
}

const top = 0
const parent = (i) => ((i + 1) >>> 1) - 1
const left = (i) => (i << 1) + 1
const right = (i) => (i + 1) << 1
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
