/**
 * Class for a Heap datastructure.
 *
 * @param {Heap|Object=} opt_heap Optional Heap or
 *     Object to initialize heap with.
 * @constructor
 * @template K, V
 */
const Heap = function (opt_heap) {
  /**
   * The nodes of the heap.
   * @private
   * @type {Array<Node>}
   */
  this.nodes_ = []

  if (opt_heap) {
    this.insertAll(opt_heap)
  }
}

/**
 * Insert the given value into the heap with the given key.
 * @param {K} key The key.
 * @param {V} value The value.
 */
Heap.prototype.insert = function (key, value) {
  const node = new Node(key, value)
  const nodes = this.nodes_
  nodes.push(node)
  this.moveUp_(nodes.length - 1)
}

/**
 * Adds multiple key-value pairs from another Heap or Object
 * @param {Heap|Object} heap Object containing the data to add.
 */
Heap.prototype.insertAll = function (heap) {
  let keys, values
  if (heap instanceof Heap) {
    keys = heap.getKeys()
    values = heap.getValues()

    // If it is a heap and the current heap is empty, I can rely on the fact
    // that the keys/values are in the correct order to put in the underlying
    // structure.
    if (this.getCount() <= 0) {
      const nodes = this.nodes_
      for (let i = 0; i < keys.length; i++) {
        nodes.push(new Node(keys[i], values[i]))
      }
      return
    }
  } else {
    keys = Object.keys(heap)
    values = Object.values(heap)
  }

  for (let i = 0; i < keys.length; i++) {
    this.insert(keys[i], values[i])
  }
}

/**
 * Retrieves and removes the root value of this heap.
 * @return {V} The value removed from the root of the heap.  Returns
 *     undefined if the heap is empty.
 */
Heap.prototype.remove = function () {
  const nodes = this.nodes_
  const count = nodes.length
  const rootNode = nodes[0]
  if (count <= 0) {
    return undefined
  } else if (count === 1) {
    clearArr(nodes)
  } else {
    nodes[0] = nodes.pop()
    this.moveDown_(0)
  }
  return rootNode.getValue()
}

/**
 * Retrieves but does not remove the root value of this heap.
 * @return {V} The value at the root of the heap. Returns
 *     undefined if the heap is empty.
 */
Heap.prototype.peek = function () {
  const nodes = this.nodes_
  if (nodes.length === 0) {
    return undefined
  }
  return nodes[0].getValue()
}

/**
 * Retrieves but does not remove the key of the root node of this heap.
 * @return {K} The key at the root of the heap. Returns undefined if the
 *     heap is empty.
 */
Heap.prototype.peekKey = function () {
  return this.nodes_[0] && this.nodes_[0].getKey()
}

/**
 * Moves the node at the given index down to its proper place in the heap.
 * @param {number} index The index of the node to move down.
 * @private
 */
Heap.prototype.moveDown_ = function (index) {
  const nodes = this.nodes_
  const count = nodes.length

  // Save the node being moved down.
  const node = nodes[index]
  // While the current node has a child.
  while (index < count >> 1) {
    const leftChildIndex = this.getLeftChildIndex_(index)
    const rightChildIndex = this.getRightChildIndex_(index)

    // Determine the index of the smaller child.
    const smallerChildIndex =
      rightChildIndex < count &&
      nodes[rightChildIndex].getKey() < nodes[leftChildIndex].getKey()
        ? rightChildIndex
        : leftChildIndex

    // If the node being moved down is smaller than its children, the node
    // has found the correct index it should be at.
    if (nodes[smallerChildIndex].getKey() > node.getKey()) {
      break
    }

    // If not, then take the smaller child as the current node.
    nodes[index] = nodes[smallerChildIndex]
    index = smallerChildIndex
  }
  nodes[index] = node
}

/**
 * Moves the node at the given index up to its proper place in the heap.
 * @param {number} index The index of the node to move up.
 * @private
 */
Heap.prototype.moveUp_ = function (index) {
  const nodes = this.nodes_
  const node = nodes[index]

  // While the node being moved up is not at the root.
  while (index > 0) {
    // If the parent is less than the node being moved up, move the parent down.
    const parentIndex = this.getParentIndex_(index)
    if (nodes[parentIndex].getKey() > node.getKey()) {
      nodes[index] = nodes[parentIndex]
      index = parentIndex
    } else {
      break
    }
  }
  nodes[index] = node
}

/**
 * Gets the index of the left child of the node at the given index.
 * @param {number} index The index of the node to get the left child for.
 * @return {number} The index of the left child.
 * @private
 */
Heap.prototype.getLeftChildIndex_ = function (index) {
  return index * 2 + 1
}

/**
 * Gets the index of the right child of the node at the given index.
 * @param {number} index The index of the node to get the right child for.
 * @return {number} The index of the right child.
 * @private
 */
Heap.prototype.getRightChildIndex_ = function (index) {
  return index * 2 + 2
}

/**
 * Gets the index of the parent of the node at the given index.
 * @param {number} index The index of the node to get the parent for.
 * @return {number} The index of the parent.
 * @private
 */
Heap.prototype.getParentIndex_ = function (index) {
  return (index - 1) >> 1
}

/**
 * Gets the values of the heap.
 * @return {!Array<V>} The values in the heap.
 */
Heap.prototype.getValues = function () {
  const nodes = this.nodes_
  const rv = []
  const l = nodes.length
  for (let i = 0; i < l; i++) {
    rv.push(nodes[i].getValue())
  }
  return rv
}

/**
 * Gets the keys of the heap.
 * @return {!Array<K>} The keys in the heap.
 */
Heap.prototype.getKeys = function () {
  const nodes = this.nodes_
  const rv = []
  const l = nodes.length
  for (let i = 0; i < l; i++) {
    rv.push(nodes[i].getKey())
  }
  return rv
}

/**
 * Whether the heap contains the given value.
 * @param {V} val The value to check for.
 * @return {boolean} Whether the heap contains the value.
 */
Heap.prototype.containsValue = function (val) {
  return this.nodes_.some(function (node) {
    return node.getValue() == val
  })
}

/**
 * Whether the heap contains the given key.
 * @param {K} key The key to check for.
 * @return {boolean} Whether the heap contains the key.
 */
Heap.prototype.containsKey = function (key) {
  return this.nodes_.some(function (node) {
    return node.getKey() == key
  })
}

/**
 * Clones a heap and returns a new heap
 * @return {!Heap} A new Heap with the same key-value
 *     pairs.
 */
Heap.prototype.clone = function () {
  return new Heap(this)
}

/**
 * The number of key-value pairs in the map
 * @return {number} The number of pairs.
 */
Heap.prototype.getCount = function () {
  return this.nodes_.length
}

/**
 * Returns true if this heap contains no elements.
 * @return {boolean} Whether this heap contains no elements.
 */
Heap.prototype.isEmpty = function () {
  return this.nodes_.length === 0
}

/**
 * Removes all elements from the heap.
 */
Heap.prototype.clear = function () {
  clearArr(this.nodes_)
}

function clearArr(arr) {
  if (!Array.isArray(arr)) {
    for (let i = arr.length - 1; i >= 0; i--) {
      delete arr[i]
    }
  }
  arr.length = 0
}

/**
 * A generic immutable node. This can be used in various collections that
 * require a node object for its item (such as a heap).
 * @param {K} key Key.
 * @param {V} value Value.
 * @constructor
 * @template K, V
 */
const Node = function (key, value) {
  /**
   * The key.
   * @private {K}
   */
  this.key_ = key

  /**
   * The value.
   * @private {V}
   */
  this.value_ = value
}

/**
 * Gets the key.
 * @return {K} The key.
 */
Node.prototype.getKey = function () {
  return this.key_
}

/**
 * Gets the value.
 * @return {V} The value.
 */
Node.prototype.getValue = function () {
  return this.value_
}

/**
 * Clones a node and returns a new node.
 * @return {!Node<K, V>} A new Node with the same
 *     key value pair.
 */
Node.prototype.clone = function () {
  return new Node(this.key_, this.value_)
}
