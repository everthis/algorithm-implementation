const assert = require('assert')
const PQ = require('../PriorityQueue')

describe('PriorityQueue(Max-Heap)', function () {
  describe('#Pop()', function () {
    const pq = new PQ()
    pq.push(...[3, 6, 2, 9, 1, 8, 7, 5])
    it('should return max value in the heap.', function () {
      assert.equal(pq.pop(), 9)
      assert.equal(pq.pop(), 8)
      assert.equal(pq.pop(), 7)
      assert.equal(pq.pop(), 6)
      assert.equal(pq.pop(), 5)
      assert.equal(pq.pop(), 3)
      assert.equal(pq.pop(), 2)
      assert.equal(pq.pop(), 1)
    })
  })
})

describe('PriorityQueue(Max-Heap) with duplicated value.', function () {
  describe('#Pop()', function () {
    const pq = new PQ()
    pq.push(...[3, 6, 2, 9, 1, 8, 7, 5, 9, 9])
    it('should return max value in the heap.', function () {
      assert.equal(pq.pop(), 9)
      assert.equal(pq.pop(), 9)
      assert.equal(pq.pop(), 9)
      assert.equal(pq.pop(), 8)
      assert.equal(pq.pop(), 7)
      assert.equal(pq.pop(), 6)
      assert.equal(pq.pop(), 5)
      assert.equal(pq.pop(), 3)
      assert.equal(pq.pop(), 2)
      assert.equal(pq.pop(), 1)
    })
  })
})

describe('PriorityQueue(Min-Heap)', function () {
  describe('#Pop()', function () {
    const pq = new PQ((a, b) => a < b)
    pq.push(...[3, 6, 2, 9, 1, 8, 7, 5])
    it('should return max value in the heap.', function () {
      assert.equal(pq.pop(), 1)
      assert.equal(pq.pop(), 2)
      assert.equal(pq.pop(), 3)
      assert.equal(pq.pop(), 5)
      assert.equal(pq.pop(), 6)
      assert.equal(pq.pop(), 7)
      assert.equal(pq.pop(), 8)
      assert.equal(pq.pop(), 9)
    })
  })
})
