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


