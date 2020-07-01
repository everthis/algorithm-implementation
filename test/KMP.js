const { expect } = require('chai')
const kmp = require('../src/KMP')

describe('KMP', function () {
  describe('#search pattern', function () {
    it('should return end index of every match.', function () {
      const str = 'acdeuiopcdccdeuh'
      const pattern = 'cdeu'
      expect(kmp(str, pattern)).to.eql([5, 15])
    })

    it('should return an empty array when there is no match', function () {
      const str = 'acdeuiopcdccdeuh'
      const pattern = 'cdeuu'
      expect(kmp(str, pattern)).to.eql([])
    })
  })
})
