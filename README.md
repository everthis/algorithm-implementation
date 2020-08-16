# Algorithm Implementation

Algorithm Implementation.

[![HitCount](http://hits.dwyl.com/everthis/algorithm-implementation.svg)](http://hits.dwyl.com/everthis/algorithm-implementation)
[![codecov](https://codecov.io/gh/everthis/algorithm-implementation/branch/master/graph/badge.svg)](https://codecov.io/gh/everthis/algorithm-implementation)
[![Build Status](https://travis-ci.com/everthis/algorithm-implementation.png?branch=master)](https://travis-ci.com/everthis/algorithm-implementation)


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
const lowBit = (x) => x & -x
class FenwickTree {
  constructor(n) {
    if (n < 1) return
    this.sum = Array(n + 1).fill(0)
  }
  update(i, delta) {
    if (i < 1) return
    while (i < this.sum.length) {
      this.sum[i] += delta
      i += lowBit(i)
    }
  }
  query(i) {
    if (i < 1) return
    let sum = 0
    while (i > 0) {
      sum += this.sum[i]
      i -= lowBit(i)
    }
    return sum
  }
}
```

</details>

[LeetCode-307.Range Sum Query - Mutable](https://leetcode.com/problems/range-sum-query-mutable/)


## Segment Tree

<details>
  <summary>Segment Tree</summary>
  
```js
class SegmentTree {
  /* Constructor to construct segment tree from given array. This 
       constructor  allocates memory for segment tree and calls 
       constructSTUtil() to  fill the allocated memory */
  constructor(arr, n) {
    // Allocate memory for segment tree
    //Height of segment tree
    const x = Math.ceil(Math.log(n) / Math.log(2))
    //Maximum size of segment tree
    const max_size = 2 * Math.pow(2, x) - 1
    this.st = new Array(max_size) // Memory allocation
    this.constructSTUtil(arr, 0, n - 1, 0)
  }

  // A utility function to get the middle index from corner indexes.
  getMid(s, e) {
    return s + (((e - s) / 2) >> 0)
  }

  /*  A recursive function to get the sum of values in given range 
        of the array.  The following are parameters for this function. 
  
      st    --> Pointer to segment tree 
      si    --> Index of current node in the segment tree. Initially 
                0 is passed as root is always at index 0 
      ss & se  --> Starting and ending indexes of the segment represented 
                    by current node, i.e., st[si] 
      qs & qe  --> Starting and ending indexes of query range */
  getSumUtil(ss, se, qs, qe, si) {
    // If segment of this node is a part of given range, then return
    // the sum of the segment
    if (qs <= ss && qe >= se) return this.st[si]
    // If segment of this node is outside the given range
    if (se < qs || ss > qe) return 0
    // If a part of this segment overlaps with the given range
    const mid = this.getMid(ss, se)
    return (
      this.getSumUtil(ss, mid, qs, qe, 2 * si + 1) +
      this.getSumUtil(mid + 1, se, qs, qe, 2 * si + 2)
    )
  }

  /* A recursive function to update the nodes which have the given  
       index in their range. The following are parameters 
        st, si, ss and se are same as getSumUtil() 
        i    --> index of the element to be updated. This index is in 
                 input array. 
       diff --> Value to be added to all nodes which have i in range */
  updateValueUtil(ss, se, i, diff, si) {
    // Base Case: If the input index lies outside the range of
    // this segment
    if (i < ss || i > se) return
    // If the input index is in range of this node, then update the
    // value of the node and its children
    this.st[si] = this.st[si] + diff
    if (se != ss) {
      const mid = this.getMid(ss, se)
      this.updateValueUtil(ss, mid, i, diff, 2 * si + 1)
      this.updateValueUtil(mid + 1, se, i, diff, 2 * si + 2)
    }
  }

  // The function to update a value in input array and segment tree.
  // It uses updateValueUtil() to update the value in segment tree
  updateValue(arr, n, i, new_val) {
    // Check for erroneous input index
    if (i < 0 || i > n - 1) {
      return
    }
    // Get the difference between new value and old value
    const diff = new_val - arr[i]
    // Update the value in array
    arr[i] = new_val
    // Update the values of nodes in segment tree
    this.updateValueUtil(0, n - 1, i, diff, 0)
  }

  // Return sum of elements in range from index qs (quey start) to
  // qe (query end).  It mainly uses getSumUtil()
  getSum(n, qs, qe) {
    // Check for erroneous input values
    if (qs < 0 || qe > n - 1 || qs > qe) {
      return -1
    }
    return this.getSumUtil(0, n - 1, qs, qe, 0)
  }

  // A recursive function that constructs Segment Tree for array[ss..se].
  // si is index of current node in segment tree st
  constructSTUtil(arr, ss, se, si) {
    // If there is one element in array, store it in current node of
    // segment tree and return
    if (ss == se) {
      this.st[si] = arr[ss]
      return arr[ss]
    }
    // If there are more than one elements, then recur for left and
    // right subtrees and store the sum of values in this node
    const mid = this.getMid(ss, se)
    this.st[si] =
      this.constructSTUtil(arr, ss, mid, si * 2 + 1) +
      this.constructSTUtil(arr, mid + 1, se, si * 2 + 2)
    return this.st[si]
  }
}

/**
const arr = [1, 3, 5, 7, 9, 11]
const n = arr.length
const t = new SegmentTree(arr, n)
const log = console.log
log(t.getSum(n, 1, 3))
t.updateValue(arr, n, 1, 10)
log(t.getSum(n, 1, 3))
*/

```

</details>

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

````
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
````

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


## QuickSelect

<details>
  <summary>Quicksort implementation</summary>

```js
function QuickSelect(array, k, comparator) {
  const compare = comparator || defaultcomparator;
  if (array.length < k) {
    return array;
  }
  const idx = select(array, k, compare);
  if (idx !== k) console.log("could not complete quickselect");
  return array;
}
const defaultcomparator = (a, b) => a < b;
function swap(array, index1, index2) {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}
function partition(array, leftindex, rightindex, pivotindex, compare) {
  const pivotvalue = array[pivotindex];
  swap(array, pivotindex, rightindex);
  let storeindex = leftindex;
  for (let i = leftindex; i < rightindex; i += 1) {
    if (compare(array[i], pivotvalue)) {
      swap(array, storeindex, i);
      storeindex += 1;
    }
  }
  swap(array, rightindex, storeindex);
  return storeindex;
}
function select(array, k, compare) {
  let leftindex = 0;
  let rightindex = array.length - 1;
  while (true) {
    if (leftindex == rightindex) return leftindex;
    let pivotindex = leftindex + Math.floor((rightindex - leftindex) / 2);
    pivotindex = partition(array, leftindex, rightindex, pivotindex, compare);
    if (k === pivotindex) return k;
    if (k < pivotindex) rightindex = pivotindex - 1;
    else leftindex = pivotindex + 1;
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

## BinarySearch

<details>
  <summary>BinarySearch implementation</summary>
  
```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const BinarySearch = function(nums, target) {
  const n = nums.length
  let l = 0, r = n - 1
  while(l <= r) {
    const mid = l + ((r - l) >> 1)
    if(nums[mid] === target) return mid
    if(nums[mid] > target) r = mid - 1
    else l = mid + 1
  }
  return l
};

/**

Why return low rather than high?

The last iteration is lo == hi == mid
When target > nums[mid] == nums[lo] == nums[hi], after loop lo = lo + 1 == high +1 which will be the correct index for insertion
When target < nums[mid] == nums[lo] == nums[hi], after loop hi = hi - 1 == low - 1 is not the correct index, should be low

*/

```

</details>
