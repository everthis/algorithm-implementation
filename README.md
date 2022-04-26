# Algorithm Implementation

Algorithm Implementation.

[![codecov](https://codecov.io/gh/everthis/algorithm-implementation/branch/master/graph/badge.svg)](https://codecov.io/gh/everthis/algorithm-implementation)


## Bisect

<details>
  <summary>Bisect</summary>

```js
//////////////////////////////////////////////Template/////////////////////////////////////////////////////////////
function Bisect() {
  return { insort_right, insort_left, bisect_left, bisect_right }
  function insort_right(a, x, lo = 0, hi = null) {
    lo = bisect_right(a, x, lo, hi)
    a.splice(lo, 0, x)
  }
  function bisect_right(a, x, lo = 0, hi = null) {
    // > upper_bound
    if (lo < 0) throw new Error('lo must be non-negative')
    if (hi == null) hi = a.length
    while (lo < hi) {
      let mid = parseInt((lo + hi) / 2)
      x < a[mid] ? (hi = mid) : (lo = mid + 1)
    }
    return lo
  }
  function insort_left(a, x, lo = 0, hi = null) {
    lo = bisect_left(a, x, lo, hi)
    a.splice(lo, 0, x)
  }
  function bisect_left(a, x, lo = 0, hi = null) {
    // >= lower_bound
    if (lo < 0) throw new Error('lo must be non-negative')
    if (hi == null) hi = a.length
    while (lo < hi) {
      let mid = parseInt((lo + hi) / 2)
      a[mid] < x ? (lo = mid + 1) : (hi = mid)
    }
    return lo
  }
}

```

</details>

## LIS

<details>
  <summary>LIS(Longest Increasing Subsequence) implementation</summary>

```js
const LIS = arr => {
  const n = arr.length
  // memo[j]: 长度为j的最长自增子序列最后一位的index（同长度最后一位最小）. 
  // stores the index k of the smallest value X[k] such that there is an increasing subsequence of length j ending at X[k] on the range k ≤ i
  // pre[k]: 以arr[k]结尾的LIS，arr[k]之前一个元素的index. 
  // stores the index of the predecessor of X[k] in the longest increasing subsequence ending at X[k]  
  const pre = Array(n), memo = Array(n + 1) 
  let len = 0 // length
  for(let i = 0; i < n; i++) {
    let lo = 1, hi = len
    while(lo <= hi) {
      let mid = Math.ceil((lo + hi) / 2)
      if(arr[memo[mid]] < arr[i]) lo = mid + 1
      else hi = mid - 1
    }
    const newL = lo
    pre[i] = memo[newL - 1]
    memo[newL] = i
    if(newL > len) len = newL
  }
  const res = Array(len)
  let k = memo[len]
  for(let i = len - 1; i >= 0; i--) {
    res[i] = arr[k]
    k = pre[k]
  }
  return res
}

// construct. LIS

const LIS = X => {
  const n = X.length
  const P = Array(n), M = Array(n + 1)
  let L = 0
  for(let i = 0; i < n; i++) {
     let lo = 1, hi = L
     while(lo <= hi) {
         let mid = Math.ceil((lo + hi) / 2)
         if(X[M[mid]] < X[i]) lo = mid + 1
         else hi = mid - 1
     }
     let newL = lo
     P[i] = M[newL - 1]
     M[newL] = i
     if(newL > L) L = newL 

  }
  let S = Array(L)
  let k = M[L]
  for(let i = L - 1; i >= 0; i--) {
      S[i] = X[k]
      k = P[k]
  }
  return S
}

function constructLIS(arr) {
  const n = arr.length;
  const L = Array(n);
  for (let i = 0; i < L.length; i++) L[i] = [];
  L[0].push(arr[0]);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j] && L[i].length < L[j].length + 1) {
        L[i] = L[j].slice();
      }
    }
    L[i].push(arr[i]);
  }
  let max = L[0];
  for (let x of L) {
    if (x.length > max.length) max = x;
  }
  return max;
}

/**
 * @param {number[]} nums
 * @return {number}
 */
const lengthOfLIS = function(nums) {
  const stack = []
  for(let e of nums) {
    if(stack.length === 0 || e > stack[stack.length - 1]) {
      stack.push(e)
      continue
    }
    let l = 0, r = stack.length - 1, mid
    while(l < r) {
      const mid = l + ((r - l) >> 1)
      if(e > stack[mid]) l = mid + 1
      else r = mid
    }
    stack[l] = e
  }
  return stack.length
};

```

</details>

## Convert base

<details>
  <summary>Convert base implementation</summary>
  
```js

function convertFromBaseToBase(str, fromBase, toBase){
  const num = parseInt(str, fromBase);
  return num.toString(toBase);
}

```

</details>


## ceilIIndex, floorIndex

<details>
  <summary>floorIndex, ceilIndex implementation</summary>

```js
function ceilIndex(t, l, r, key) {
  while (r - l > 1) {
    let m = (l + (r - l) / 2) >> 0
    if (t[m] >= key) {
      r = m
    } else {
      l = m
    }
  }
  return r
}

function floorIndex(t, l, r, key) {
  while (r - l > 1) {
    let m = (l + (r - l) / 2) >> 0
    if (t[m] <= key) {
      l = m
    } else {
      r = m
    }
  }
  return l
}

```

</details>

## lower_bound

<details>
  <summary>lower_bound implementation</summary>

```js
// the first element in the range [first, last) which has a value not less than val.
// This means that the function returns the index of the next smallest number just
// greater than or equal to that number. If there are multiple values that are equal to val,
// lower_bound() returns the index of the first such value.

// Like C++'s std::lower_bound.  Returns the first index at which
// `value` could be inserted without changing the ordering.  Assumes
// the array is sorted.
//
// `first` and `last` are indices and `less` is an optionally-specified
// function that returns true if
//   array[i] < value
// for some i and false otherwise.
//
// Usage: lower_bound(array, value, [less])
//        lower_bound(array, first, last, value, [less])
function lower_bound(array, arg1, arg2, arg3, arg4) {
    let first;
    let last;
    let value;
    let less;
    if (arg3 === undefined) {
        first = 0;
        last = array.length;
        value = arg1;
        less = arg2;
    } else {
        first = arg1;
        last = arg2;
        value = arg3;
        less = arg4;
    }

    if (less === undefined) {
        less = function (a, b) { return a < b; };
    }

    let len = last - first;
    let middle;
    let step;
    while (len > 0) {
        step = Math.floor(len / 2);
        middle = first + step;
        if (less(array[middle], value, middle)) {
            first = middle;
            first += 1;
            len = len - step - 1;
        } else {
            len = step;
        }
    }
    return first;
};
```

</details>

## upper_bound

<details>
  <summary>upper_bound implementation</summary>

```js
/**
It returns the first element in the range [first, last) that
is greater than value, or last if no such element is found.
*/
function upperBound(array, func) {
  let diff, len, i, current;
  len = array.length;
  i = 0;

  while (len) {
    diff = len >>> 1;
    current = i + diff;

    if (func(array[current])) {
      len = diff;
    } else {
      i = current + 1;
      len -= diff + 1;
    }
  }

  return i;
}
```

</details>

## Binary insert

<details>
  <summary>Binary insert implementation</summary>

```js
/**
 * Takes in a __SORTED__ array and inserts the provided value into
 * the correct, sorted, position.
 * @param array the sorted array where the provided value needs to be inserted (in order)
 * @param insertValue value to be added to the array
 * @param comparator function that helps determine where to insert the value (
 */
function binaryInsert(array, insertValue, comparator = (a, b) => a - b) {
  /*
  * These two conditional statements are not required, but will avoid the
  * while loop below, potentially speeding up the insert by a decent amount.
  * */
  if (array.length === 0 || comparator(array[0], insertValue) >= 0) {
    array.splice(0, 0, insertValue)
    return array;
  } else if (array.length > 0 && comparator(array[array.length - 1], insertValue) <= 0) {
    array.splice(array.length, 0, insertValue);
    return array;
  }
  let left = 0, right = array.length;
  let leftLast = 0, rightLast = right;
  while (left < right) {
    const inPos = Math.floor((right + left) / 2)
    const compared = comparator(array[inPos], insertValue);
    if (compared < 0) {
      left = inPos;
    } else if (compared > 0) {
      right = inPos;
    } else {
      right = inPos;
      left = inPos;
    }
    // nothing has changed, must have found limits. insert between.
    if (leftLast === left && rightLast === right) {
      break;
    }
    leftLast = left;
    rightLast = right;
  }
  // use right, because Math.floor is used
  array.splice(right, 0, insertValue);
  return array
}
```

</details>


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

[LeetCode-315. Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self/)

[LeetCode-327. Count of Range Sum](https://leetcode.com/problems/count-of-range-sum/)

[LeetCode-493. Reverse Pairs](https://leetcode.com/problems/reverse-pairs/)

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


Why does Binary search algorithm use floor and not ceiling - not in an half open range?

This all depends on how you update your left and right variable.

Normally, we use left = middle+1 and right = middle-1, with stopping criteria left = right.

In this case, ceiling or flooring the middle value doesn't matter.

However, if we use left = middle+1 and right = middle, we must take the floor of the middle value, otherwise we end up in an endless loop.

Consider finding 11 in array 11, 22.

We set left = 0 and right = 1, the middle is 0.5, if we take the ceiling, it would be 1.
Since 22 is larger than query, we need to cut the right half and move right boarder towards middle.
This works fine when the array is large, but since there are only two elements.
right = middle will again set right to 1. We have an infinite loop.

To sum up,

both ceiling and flooring work fine with left = middle+1 and right = middle-1
ceiling works fine with left = middle and right = middle-1
flooring works fine with left = middle+1 and right = middle


*/

```
  
```js
function binarySearch(arr, compareFn, target) {
  let left = 0;  // inclusive
  let right = arr.length;  // exclusive
  let found;
  while (left < right) {
    const middle = left + ((right - left) >> 1);
    const compareResult = compareFn(target, arr[middle]);
    if (compareResult > 0) {
      left = middle + 1;
    } else {
      right = middle;
      // We are looking for the lowest index so we can't return immediately.
      found = !compareResult;
    }
  }
  // left is the index if found, or the insertion point otherwise.
  // ~left is a shorthand for -left - 1.
  return found ? left : ~left;
};
```

</details>

## Greatest Common Divisor

<details>
  <summary>Greatest common divisor implementation</summary>

```js
function GCD(a, b) {
  if (a === 0) return b
  if (b === 0) return a
  return GCD(Math.abs(a - b), Math.min(a, b))
}

// or

function gcd(a, b) {
  return b ? gcd(b, a % b) : a
}

// or

function gcd(a, b) {
  while (b) {
    a %= b
    b = [a, (a = b)][0]
  }
  return a
}

```

</details>

## Least Common Multiple

<details>
  <summary>Least Common Multiple implementation</summary>

```js
function lcm(a, b) {
  return a / gcd(a, b) * b;
}
  
// another

function lcm(a, b) {
  return a * b / gcd(a, b);
}

```
</details>

## Manacher's Algorithm

<details>
  <summary>Manacher's Algorithm implementation</summary>

```js
function manachersAlgorithm(s, N) {
  const str = getModifiedString(s, N)
  const len = 2 * N + 1
  // expansion length
  const P = new Array(len).fill(0)
  // stores the center of the longest palindromic substring until now
  let c = 0
  // stores the right boundary of the longest palindromic substring until now
  let r = 0
  let maxLen = 0
  for (let i = 0; i < len; i++) {
    //get mirror index of i
    const mirror = 2 * c - i
    // see if the mirror of i is expanding beyond the left boundary
    // of current longest palindrome at center c
    // if it is, then take r - i as P[i]
    // else take P[mirror] as P[i]
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
    // check if the expanded palindrome at i is expanding beyond the
    // right boundary of current longest palindrome at center c
    // if it is, the new center is i
    if (i + P[i] > r) {
      c = i
      r = i + P[i]
      if (P[i] > maxLen) {
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
```
  
</details>

## Gray code

<details>
  <summary>Gray code implementation</summary>

```js
function BinaryToGray(num) {
  // The operator >> is shift right. The operator ^ is exclusive or.
  return num ^ (num >> 1);
}

// This function converts a reflected binary Gray code number to a binary number.
function GrayToBinary(num) {
  let mask = num;
  // Each Gray code bit is exclusive-ored with all more significant bits.
  while (mask) {
    mask >>= 1;
    num   ^= mask;
  }
  return num;
}

// A more efficient version for Gray codes 32 bits or fewer
// through the use of SWAR (SIMD within a register) techniques. 
// It implements a parallel prefix XOR function. The assignment
// statements can be in any order.
// 
// This function can be adapted for longer Gray codes by adding steps. 

function GrayToBinary32(num) {
  num ^= num >> 16;
  num ^= num >>  8;
  num ^= num >>  4;
  num ^= num >>  2;
  num ^= num >>  1;
  return num;
}
```

</details>


## Trie

<details>
  <summary>Trie implementation</summary>

```js
class TrieNode {
  constructor(v, isComplete = false) {
    this.val = v;
    this.isComplete = isComplete;
    this.children = new Map();
  }
}
class Trie {
  constructor() {
    this.head = new TrieNode(null);
  }

  /**
   * @param {string} word
   * @return {Trie}
   */
  addWord(word) {
    const characters = Array.from(word);
    let currentNode = this.head;
    for (let charIndex = 0; charIndex < characters.length; charIndex++) {
      const isComplete = charIndex === characters.length - 1;
      const char = characters[charIndex];
      if (currentNode.children.has(char)) {
        currentNode = currentNode.children.get(char);
      } else {
        const child = new TrieNode(char, isComplete);
        currentNode.children.set(char, child);
        currentNode = child;
      }
    }
    return this;
  }

  /**
   * @param {string} word
   * @return {Trie}
   */
  deleteWord(word) {
    const depthFirstDelete = (currentNode, charIndex = 0) => {
      if (charIndex >= word.length) {
        return;
      }
      const character = word[charIndex];
      const nextNode = currentNode.children.get(character);
      if (nextNode == null) {
        return;
      }
      depthFirstDelete(nextNode, charIndex + 1);
      if (charIndex === word.length - 1) {
        nextNode.isComplete = false;
      }
      // childNode is deleted only if:
      // - childNode has NO children
      // - childNode.isComplete === false
      if (nextNode.children.size === 0) {
        currentNode.children.delete(character);
      }
    };
    depthFirstDelete(this.head);
    return this;
  }

  /**
   * @param {string} word
   * @return {string[]}
   */
  suggestNextCharacters(word) {
    const lastCharacter = this.getLastCharacterNode(word);
    if (!lastCharacter) {
      return null;
    }
    return this.suggestChildren(lastCharacter);
  }

  /**
   * @param {TrieNode} node
   * @return {TrieNode}
   */
  suggestChildren(node) {
    if (node == null) return [];
    return [...node.children.keys()];
  }

  /**
   * Check if complete word exists in Trie.
   *
   * @param {string} word
   * @return {boolean}
   */
  doesWordExist(word) {
    const lastCharacter = this.getLastCharacterNode(word);
    return !!lastCharacter && lastCharacter.isComplete;
  }

  /**
   * @param {string} word
   * @return {TrieNode}
   */
  getLastCharacterNode(word) {
    const characters = Array.from(word);
    let currentNode = this.head;
    for (let charIndex = 0; charIndex < characters.length; charIndex++) {
      const char = characters[charIndex];
      if (!currentNode.children.has(char)) {
        return null;
      }
      currentNode = currentNode.children.get(char);
    }
    return currentNode;
  }
}

```

</details>

## Bloom filter

<details>
  <summary>Bloom filter implementation</summary>

```js
class BloomFilter {
  /**
   * @param {number} size - the size of the storage.
   */
  constructor(size = 100) {
    // Bloom filter size directly affects the likelihood of false positives.
    // The bigger the size the lower the likelihood of false positives.
    this.size = size
    this.storage = this.createStore(size)
  }

  /**
   * @param {string} item
   */
  insert(item) {
    const hashValues = this.getHashValues(item)
    hashValues.forEach((val) => this.storage.setValue(val))
  }

  /**
   * @param {string} item
   * @return {boolean}
   */
  mayContain(item) {
    const hashValues = this.getHashValues(item)
    for (let hashIndex = 0; hashIndex < hashValues.length; hashIndex += 1) {
      if (!this.storage.getValue(hashValues[hashIndex])) {
        return false
      }
    }
    return true
  }

  /**
   * @param {number} size
   * @return {Object}
   */
  createStore(size) {
    const storage = []
    for (
      let storageCellIndex = 0;
      storageCellIndex < size;
      storageCellIndex += 1
    ) {
      storage.push(false)
    }
    const storageInterface = {
      getValue(index) {
        return storage[index]
      },
      setValue(index) {
        storage[index] = true
      },
    }
    return storageInterface
  }

  /**
   * @param {string} item
   * @return {number}
   */
  hash1(item) {
    let hash = 0
    for (let charIndex = 0; charIndex < item.length; charIndex += 1) {
      const char = item.charCodeAt(charIndex)
      hash = (hash << 5) + hash + char
      hash &= hash
      hash = Math.abs(hash)
    }
    return hash % this.size
  }

  /**
   * @param {string} item
   * @return {number}
   */
  hash2(item) {
    let hash = 5381
    for (let charIndex = 0; charIndex < item.length; charIndex += 1) {
      const char = item.charCodeAt(charIndex)
      hash = (hash << 5) + hash + char
    }
    return Math.abs(hash % this.size)
  }

  /**
   * @param {string} item
   * @return {number}
   */
  hash3(item) {
    let hash = 0
    for (let charIndex = 0; charIndex < item.length; charIndex += 1) {
      const char = item.charCodeAt(charIndex)
      hash = (hash << 5) - hash
      hash += char
      hash &= hash
    }
    return Math.abs(hash % this.size)
  }

  /**
   * Runs all 3 hash functions on the input and returns an array of results.
   *
   * @param {string} item
   * @return {number[]}
   */
  getHashValues(item) {
    return [this.hash1(item), this.hash2(item), this.hash3(item)]
  }
}

```


</details>

## Inverse element

<details>
  <summary>Inverse element implementation</summary>

```js
function inverseElement(a, n) {
  let N = n
  if (GCD(a, n) == 1) {
    let p = 1,
      q = 0,
      r = 0,
      s = 1
    let c, quot, new_r, new_s
    while (n !== 0) {
      c = modulo(a, n)
      quot = Math.floor(a / n)
      a = n
      n = c
      new_r = p - quot * r
      new_s = q - quot * s
      p = r
      q = s
      r = new_r
      s = new_s
    }
    return modulo(p, N)
  } else {
    return null
  }
}

function modulo(a, n) {
  if (a >= 0) {
    return a % n
  } else {
    return (a % n) + n
  }
}

// another

function inverseElement(a, b) {
  return quickPow(a, b - 2) % b
}

function quickPow(a, b) {
  let ans = 1;
  a = (a % p + p) % p;
  for (; b; b >>= 1) {
    if (b & 1) ans = (a * ans) % p;
    a = (a * a) % p;
  }
  return ans;
}
```

</details>

## Sieve of Eratosthenes

<details>
  <summary>Sieve of Eratosthenes implementation</summary>

```js
/**
 * @param {number} maxNumber
 * @return {number[]}
 */
export default function sieveOfEratosthenes(maxNumber) {
  const isPrime = new Array(maxNumber + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;

  const primes = [];
  for (let number = 2; number <= maxNumber; number += 1) {
    if (isPrime[number] === true) {
      primes.push(number);
      let nextNumber = number * 2;
      while (nextNumber <= maxNumber) {
        isPrime[nextNumber] = false;
        nextNumber += number;
      }
    }
  }

  return primes;
}
```

</details>

## Square root

<details>
  <summary>Square root implementation</summary>

```js
function squareRoot(number, tolerance = 0.0001) {
  if (number < 0) {
    return null;
  }
  if (number === 0) {
    return 0;
  }
  let root = 1;
  const requiredDelta = 1 / (10 ** tolerance);
  while (Math.abs(number - (root ** 2)) > requiredDelta) {
    root -= ((root ** 2) - number) / (2 * root);
  }
  return Math.round(root * (10 ** tolerance)) / (10 ** tolerance);
}
```
</details>
  

## Is power of two

<details>
  <summary>Is power of two implementation</summary>

```js
function isPowerOfTwoBitwise(number) {
  if (number < 1) return false
  return (number & (number - 1)) === 0;
}
```

</details>

## Integer partition

<details>
  <summary>Integer partition implementation</summary>

```js
function integerPartition(number) {
  const partitionMatrix = Array(number + 1)
    .fill(null)
    .map(() => {
      return Array(number + 1).fill(null)
    })
  for (let numberIndex = 1; numberIndex <= number; numberIndex++) {
    partitionMatrix[0][numberIndex] = 0
  }
  for (let summandIndex = 0; summandIndex <= number; summandIndex++) {
    partitionMatrix[summandIndex][0] = 1
  }
  for (let summandIndex = 1; summandIndex <= number; summandIndex++) {
    for (let numberIndex = 1; numberIndex <= number; numberIndex++) {
      if (summandIndex > numberIndex) {
        partitionMatrix[summandIndex][numberIndex] =
          partitionMatrix[summandIndex - 1][numberIndex]
      } else {
        const combosWithoutSummand =
          partitionMatrix[summandIndex - 1][numberIndex]
        const combosWithSummand =
          partitionMatrix[summandIndex][numberIndex - summandIndex]

        partitionMatrix[summandIndex][numberIndex] =
          combosWithoutSummand + combosWithSummand
      }
    }
  }
  return partitionMatrix[number][number]
}

```

</details>


## Power

<details>
  <summary>Power implementation</summary>

```js
function power(base, power) {
  if (power === 0) return 1
  if (power % 2 === 0) {
    const multiplier = fastPowering(base, power / 2)
    return multiplier * multiplier
  }
  const multiplier = fastPowering(base, Math.floor(power / 2))
  return multiplier * multiplier * base
}

```

</details>


## Combinations

<details>
  <summary>Combinations implementation</summary>

```js
// combinations without repetition
function comb(n, r) {
  if (n < r) return 0;
  let res = 1;
  if (n - r < r) r = n - r;
  for (let i = n, j = 1; i >= 1 && j <= r; --i, ++j) {
    res = res * i;
  }
  for (let i = r; i >= 2; --i) {
    res = res / i;
  }
  return res;
}
```

</details>

## Bell number

<details>
  <summary>Bell number implementation</summary>
 
```js
// Bell triangle method
function bellNumber(n) {
  const bell = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0))
  bell[0][0] = 1
  for (let i = 1; i <= n; i++) {
    bell[i][0] = bell[i - 1][i - 1]
    for (let j = 1; j <= i; j++)
      bell[i][j] = bell[i - 1][j - 1] + bell[i][j - 1]
  }
  return bell[n][0]
}
```

</details>

## Partition a set into k subsets

<details>
  <summary>Partition a set into k subsets implementation</summary>

```js
// Returns count of different partitions of n
// elements in k subsets
function countP(n, k) {
  const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0))
  // Base cases
  for (let i = 0; i <= n; i++) dp[i][0] = 0
  for (let i = 0; i <= k; i++) dp[0][k] = 0
  // Bottom up
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= k; j++) {
      if (j == 1 || i == j) dp[i][j] = 1
      else dp[i][j] = j * dp[i - 1][j] + dp[i - 1][j - 1]
    }
  }
  return dp[n][k]
}
```
</details>

## TreeSet

<details>
  <summary>TreeSet implementation</summary>

```js
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
```
</details>

## Red Black Tree

<details>
  <summary>Red black tree implementation</summary>

```js
class Comparator {
  constructor(compareFunction) {
    this.compare = compareFunction || Comparator.defaultCompareFunction
  }
  static defaultCompareFunction(a, b) {
    if (a === b) {
      return 0
    }
    return a < b ? -1 : 1
  }
  equal(a, b) {
    return this.compare(a, b) === 0
  }
  lessThan(a, b) {
    return this.compare(a, b) < 0
  }
  greaterThan(a, b) {
    return this.compare(a, b) > 0
  }
  lessThanOrEqual(a, b) {
    return this.lessThan(a, b) || this.equal(a, b)
  }
  greaterThanOrEqual(a, b) {
    return this.greaterThan(a, b) || this.equal(a, b)
  }
  reverse() {
    const compareOriginal = this.compare
    this.compare = (a, b) => compareOriginal(b, a)
  }
}

class LinkedListNode {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }
  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`
  }
}

class LinkedList {
  constructor(comparatorFunction) {
    this.head = null
    this.tail = null
    this.compare = new Comparator(comparatorFunction)
  }
  prepend(value) {
    const newNode = new LinkedListNode(value, this.head)
    this.head = newNode
    if (!this.tail) {
      this.tail = newNode
    }
    return this
  }
  append(value) {
    const newNode = new LinkedListNode(value)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
      return this
    }
    this.tail.next = newNode
    this.tail = newNode
    return this
  }
  delete(value) {
    if (!this.head) {
      return null
    }
    let deletedNode = null
    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head
      this.head = this.head.next
    }
    let currentNode = this.head
    if (currentNode !== null) {
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next
          currentNode.next = currentNode.next.next
        } else {
          currentNode = currentNode.next
        }
      }
    }
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode
    }
    return deletedNode
  }
  find({ value = undefined, callback = undefined }) {
    if (!this.head) {
      return null
    }
    let currentNode = this.head
    while (currentNode) {
      if (callback && callback(currentNode.value)) {
        return currentNode
      }
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode
      }
      currentNode = currentNode.next
    }
    return null
  }
  deleteTail() {
    const deletedTail = this.tail
    if (this.head === this.tail) {
      this.head = null
      this.tail = null
      return deletedTail
    }
    let currentNode = this.head
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null
      } else {
        currentNode = currentNode.next
      }
    }
    this.tail = currentNode
    return deletedTail
  }
  deleteHead() {
    if (!this.head) {
      return null
    }
    const deletedHead = this.head
    if (this.head.next) {
      this.head = this.head.next
    } else {
      this.head = null
      this.tail = null
    }
    return deletedHead
  }
  fromArray(values) {
    values.forEach((value) => this.append(value))
    return this
  }
  toArray() {
    const nodes = []
    let currentNode = this.head
    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }
    return nodes
  }
  toString(callback) {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString()
  }
  reverse() {
    let currNode = this.head
    let prevNode = null
    let nextNode = null
    while (currNode) {
      nextNode = currNode.next
      currNode.next = prevNode
      prevNode = currNode
      currNode = nextNode
    }
    this.tail = this.head
    this.head = prevNode
    return this
  }
}


const defaultHashTableSize = 32

class HashTable {
  constructor(hashTableSize = defaultHashTableSize) {
    this.buckets = Array(hashTableSize)
      .fill(null)
      .map(() => new LinkedList())
    this.keys = {}
  }
  hash(key) {
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => hashAccumulator + keySymbol.charCodeAt(0),
      0
    )
    return hash % this.buckets.length
  }
  set(key, value) {
    const keyHash = this.hash(key)
    this.keys[key] = keyHash
    const bucketLinkedList = this.buckets[keyHash]
    const node = bucketLinkedList.find({
      callback: (nodeValue) => nodeValue.key === key,
    })
    if (!node) {
      bucketLinkedList.append({ key, value })
    } else {
      node.value.value = value
    }
  }
  delete(key) {
    const keyHash = this.hash(key)
    delete this.keys[key]
    const bucketLinkedList = this.buckets[keyHash]
    const node = bucketLinkedList.find({
      callback: (nodeValue) => nodeValue.key === key,
    })
    if (node) {
      return bucketLinkedList.delete(node.value)
    }
    return null
  }
  get(key) {
    const bucketLinkedList = this.buckets[this.hash(key)]
    const node = bucketLinkedList.find({
      callback: (nodeValue) => nodeValue.key === key,
    })
    return node ? node.value.value : undefined
  }
  has(key) {
    return Object.hasOwnProperty.call(this.keys, key)
  }
  getKeys() {
    return Object.keys(this.keys)
  }
}

class BinaryTreeNode {
  constructor(value = null) {
    this.left = null
    this.right = null
    this.parent = null
    this.value = value
    this.meta = new HashTable()
    this.nodeComparator = new Comparator()
  }
  get leftHeight() {
    if (!this.left) {
      return 0
    }
    return this.left.height + 1
  }
  get rightHeight() {
    if (!this.right) {
      return 0
    }
    return this.right.height + 1
  }

  get height() {
    return Math.max(this.leftHeight, this.rightHeight)
  }
  get balanceFactor() {
    return this.leftHeight - this.rightHeight
  }
  get uncle() {
    if (!this.parent) {
      return undefined
    }
    if (!this.parent.parent) {
      return undefined
    }
    if (!this.parent.parent.left || !this.parent.parent.right) {
      return undefined
    }
    if (this.nodeComparator.equal(this.parent, this.parent.parent.left)) {
      return this.parent.parent.right
    }
    return this.parent.parent.left
  }

  setValue(value) {
    this.value = value
    return this
  }
  setLeft(node) {
    if (this.left) {
      this.left.parent = null
    }
    this.left = node
    if (this.left) {
      this.left.parent = this
    }
    return this
  }

  setRight(node) {
    if (this.right) {
      this.right.parent = null
    }
    this.right = node
    if (node) {
      this.right.parent = this
    }
    return this
  }
  removeChild(nodeToRemove) {
    if (this.left && this.nodeComparator.equal(this.left, nodeToRemove)) {
      this.left = null
      return true
    }
    if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
      this.right = null
      return true
    }
    return false
  }
  replaceChild(nodeToReplace, replacementNode) {
    if (!nodeToReplace || !replacementNode) {
      return false
    }
    if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
      this.left = replacementNode
      return true
    }
    if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
      this.right = replacementNode
      return true
    }
    return false
  }
  static copyNode(sourceNode, targetNode) {
    targetNode.setValue(sourceNode.value)
    targetNode.setLeft(sourceNode.left)
    targetNode.setRight(sourceNode.right)
  }
  traverseInOrder() {
    let traverse = []
    if (this.left) {
      traverse = traverse.concat(this.left.traverseInOrder())
    }
    traverse.push(this.value)
    if (this.right) {
      traverse = traverse.concat(this.right.traverseInOrder())
    }
    return traverse
  }
  toString() {
    return this.traverseInOrder().toString()
  }
}

class BinarySearchTreeNode extends BinaryTreeNode {
  constructor(value = null, compareFunction = undefined) {
    super(value)
    this.compareFunction = compareFunction
    this.nodeValueComparator = new Comparator(compareFunction)
  }
  insert(value) {
    if (this.nodeValueComparator.equal(this.value, null)) {
      this.value = value
      return this
    }
    if (this.nodeValueComparator.lessThan(value, this.value)) {
      if (this.left) {
        return this.left.insert(value)
      }
      const newNode = new BinarySearchTreeNode(value, this.compareFunction)
      this.setLeft(newNode)
      return newNode
    }
    if (this.nodeValueComparator.greaterThan(value, this.value)) {
      if (this.right) {
        return this.right.insert(value)
      }
      const newNode = new BinarySearchTreeNode(value, this.compareFunction)
      this.setRight(newNode)
      return newNode
    }
    return this
  }
  find(value) {
    if (this.nodeValueComparator.equal(this.value, value)) {
      return this
    }
    if (this.nodeValueComparator.lessThan(value, this.value) && this.left) {
      return this.left.find(value)
    }
    if (this.nodeValueComparator.greaterThan(value, this.value) && this.right) {
      return this.right.find(value)
    }
    return null
  }
  contains(value) {
    return !!this.find(value)
  }
  remove(value) {
    const nodeToRemove = this.find(value)
    if (!nodeToRemove) {
      throw new Error('Item not found in the tree')
    }
    const { parent } = nodeToRemove
    if (!nodeToRemove.left && !nodeToRemove.right) {
      if (parent) {
        parent.removeChild(nodeToRemove)
      } else {
        nodeToRemove.setValue(undefined)
      }
    } else if (nodeToRemove.left && nodeToRemove.right) {
      const nextBiggerNode = nodeToRemove.right.findMin()
      if (!this.nodeComparator.equal(nextBiggerNode, nodeToRemove.right)) {
        this.remove(nextBiggerNode.value)
        nodeToRemove.setValue(nextBiggerNode.value)
      } else {
        nodeToRemove.setValue(nodeToRemove.right.value)
        nodeToRemove.setRight(nodeToRemove.right.right)
      }
    } else {
      const childNode = nodeToRemove.left || nodeToRemove.right
      if (parent) {
        parent.replaceChild(nodeToRemove, childNode)
      } else {
        BinaryTreeNode.copyNode(childNode, nodeToRemove)
      }
    }
    nodeToRemove.parent = null
    return true
  }
  findMin() {
    if (!this.left) {
      return this
    }
    return this.left.findMin()
  }
}

class BinarySearchTree {
  constructor(nodeValueCompareFunction) {
    this.root = new BinarySearchTreeNode(null, nodeValueCompareFunction);
    this.nodeComparator = this.root.nodeComparator;
  }
  insert(value) {
    return this.root.insert(value);
  }
  contains(value) {
    return this.root.contains(value);
  }
  remove(value) {
    return this.root.remove(value);
  }
  toString() {
    return this.root.toString();
  }
}

const RED_BLACK_TREE_COLORS = {
  red: 'red',
  black: 'black',
}
const COLOR_PROP_NAME = 'color'

class RedBlackTree extends BinarySearchTree {
  insert(value) {
    const insertedNode = super.insert(value)
    if (this.nodeComparator.equal(insertedNode, this.root)) {
      this.makeNodeBlack(insertedNode)
    } else {
      this.makeNodeRed(insertedNode)
    }
    this.balance(insertedNode)
    return insertedNode
  }
  remove(value) {
    throw new Error(
      `Can't remove ${value}. Remove method is not implemented yet`
    )
  }
  balance(node) {
    if (this.nodeComparator.equal(node, this.root)) {
      return
    }
    if (this.isNodeBlack(node.parent)) {
      return
    }
    const grandParent = node.parent.parent
    if (node.uncle && this.isNodeRed(node.uncle)) {
      this.makeNodeBlack(node.uncle)
      this.makeNodeBlack(node.parent)

      if (!this.nodeComparator.equal(grandParent, this.root)) {
        this.makeNodeRed(grandParent)
      } else {
        return
      }
      this.balance(grandParent)
    } else if (!node.uncle || this.isNodeBlack(node.uncle)) {
      if (grandParent) {
        let newGrandParent
        if (this.nodeComparator.equal(grandParent.left, node.parent)) {
          if (this.nodeComparator.equal(node.parent.left, node)) {
            newGrandParent = this.leftLeftRotation(grandParent)
          } else {
            newGrandParent = this.leftRightRotation(grandParent)
          }
        } else {
          if (this.nodeComparator.equal(node.parent.right, node)) {
            newGrandParent = this.rightRightRotation(grandParent)
          } else {
            newGrandParent = this.rightLeftRotation(grandParent)
          }
        }
        if (newGrandParent && newGrandParent.parent === null) {
          this.root = newGrandParent
          this.makeNodeBlack(this.root)
        }
        this.balance(newGrandParent)
      }
    }
  }
  leftLeftRotation(grandParentNode) {
    const grandGrandParent = grandParentNode.parent
    let grandParentNodeIsLeft
    if (grandGrandParent) {
      grandParentNodeIsLeft = this.nodeComparator.equal(
        grandGrandParent.left,
        grandParentNode
      )
    }
    const parentNode = grandParentNode.left
    const parentRightNode = parentNode.right
    parentNode.setRight(grandParentNode)
    grandParentNode.setLeft(parentRightNode)
    if (grandGrandParent) {
      if (grandParentNodeIsLeft) {
        grandGrandParent.setLeft(parentNode)
      } else {
        grandGrandParent.setRight(parentNode)
      }
    } else {
      parentNode.parent = null
    }
    this.swapNodeColors(parentNode, grandParentNode)
    return parentNode
  }
  leftRightRotation(grandParentNode) {
    const parentNode = grandParentNode.left
    const childNode = parentNode.right
    const childLeftNode = childNode.left
    childNode.setLeft(parentNode)
    parentNode.setRight(childLeftNode)
    grandParentNode.setLeft(childNode)
    return this.leftLeftRotation(grandParentNode)
  }
  rightRightRotation(grandParentNode) {
    const grandGrandParent = grandParentNode.parent
    let grandParentNodeIsLeft
    if (grandGrandParent) {
      grandParentNodeIsLeft = this.nodeComparator.equal(
        grandGrandParent.left,
        grandParentNode
      )
    }
    const parentNode = grandParentNode.right
    const parentLeftNode = parentNode.left
    parentNode.setLeft(grandParentNode)
    grandParentNode.setRight(parentLeftNode)
    if (grandGrandParent) {
      if (grandParentNodeIsLeft) {
        grandGrandParent.setLeft(parentNode)
      } else {
        grandGrandParent.setRight(parentNode)
      }
    } else {
      parentNode.parent = null
    }
    this.swapNodeColors(parentNode, grandParentNode)
    return parentNode
  }
  rightLeftRotation(grandParentNode) {
    const parentNode = grandParentNode.right
    const childNode = parentNode.left
    const childRightNode = childNode.right
    childNode.setRight(parentNode)
    parentNode.setLeft(childRightNode)
    grandParentNode.setRight(childNode)
    return this.rightRightRotation(grandParentNode)
  }
  makeNodeRed(node) {
    node.meta.set(COLOR_PROP_NAME, RED_BLACK_TREE_COLORS.red)
    return node
  }
  makeNodeBlack(node) {
    node.meta.set(COLOR_PROP_NAME, RED_BLACK_TREE_COLORS.black)
    return node
  }
  isNodeRed(node) {
    return node.meta.get(COLOR_PROP_NAME) === RED_BLACK_TREE_COLORS.red
  }
  isNodeBlack(node) {
    return node.meta.get(COLOR_PROP_NAME) === RED_BLACK_TREE_COLORS.black
  }
  isNodeColored(node) {
    return this.isNodeRed(node) || this.isNodeBlack(node)
  }
  swapNodeColors(firstNode, secondNode) {
    const firstColor = firstNode.meta.get(COLOR_PROP_NAME)
    const secondColor = secondNode.meta.get(COLOR_PROP_NAME)

    firstNode.meta.set(COLOR_PROP_NAME, secondColor)
    secondNode.meta.set(COLOR_PROP_NAME, firstColor)
  }
}

```

</details>

