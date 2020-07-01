// Binary Indexed Tree
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

module.exports = FenwickTree
