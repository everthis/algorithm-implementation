const assert = require('assert')
const FenwickTree = require('../BIT')

describe('FenwickTree', function () {
  describe('Query', function () {
    const ft = new FenwickTree(5)
    it('should return range sum from index 1 to 5.', function () {
      ft.update(1, 2)
      ft.update(2, 5)
      ft.update(3, 3)
      ft.update(4, 7)
      assert.equal(ft.query(5), 17)
      assert.equal(ft.query(3), 10)
    })
  })
})
