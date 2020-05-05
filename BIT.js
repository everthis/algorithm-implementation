// Binary Indexed Tree
const lowBit = x => x & (-x)
class FenwickTree {
  constructor(n) {
    this.sum = Array(n + 1).fill(0)
  }
  update(i, delta) {
    while(i < this.sum.length) {
      this.sum[i] += delta
      i += lowBit(i) 
    }
  }
  query(i) {
    let sum = 0
    while(i > 0) {
      sum += this.sum[i]
      i -= lowBit(i)
    }
    return sum
  }
}
