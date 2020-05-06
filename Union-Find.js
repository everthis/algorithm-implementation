class UnionFind {
  constructor(n) {
    this.parents = Array(n)
      .fill(0)
      .map((e, i) => i + 1)
    this.ranks = Array(n).fill(0)
  }
  find(x) {
    if (x !== this.parents[x]) this.parents[x] = this.find(this.parents[x])
    return this.parents[x]
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
