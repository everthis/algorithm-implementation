const { expect } = require('chai')
const qs = require('../src/Quicksort')

describe('Quicksort', function () {
  describe('#Ascending', function () {
    it('should sort array ascending.', function () {
      const arr = [3, 6, 2, 9, 1, 8, 7, 5]
      qs(arr, 0, arr.length - 1)
      expect(arr).to.eql([1, 2, 3, 5, 6, 7, 8, 9])
    })

    it('should sort part of array ascending.', function () {
      const arr = [3, 6, 2, 9, 1, 8, 7, 5]
      qs(arr, 0, 3)
      expect(arr.slice(0, 4)).to.eql([2, 3, 6, 9])
    })
  })
})
