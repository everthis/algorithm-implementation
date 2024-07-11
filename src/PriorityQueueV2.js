/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */

class PQ {
  constructor(comparator) {
    this.pq = [];
    this.compare = comparator;
  }

  get size() {
    return this.pq.length;
  }

  swap(i, j) {
    const pq = this.pq;
    [pq[i], pq[j]] = [pq[j], pq[i]];
  }

  siftUp(i) {
    if (i === 0) return;
    const pq = this.pq;
    const j = Math.floor((i - 1) / 2);
    if (this.better(i, j)) {
      this.swap(i, j);
      this.siftUp(j);
    }
  }
  better(i, j) {
    const pq = this.pq
    return this.compare(pq[i], pq[j]) < 0
  }
  siftDown(i) {
    const pq = this.pq;
    const [l, r] = [i * 2 + 1, i * 2 + 2];
    if (l >= this.size) return;
    const j = r >= this.size || this.better(l, r) ? l : r;
    if (this.compare(pq[j], pq[i]) < 0) {
      this.swap(j, i);
      this.siftDown(j);
    }
  }

  insert(val) {
    this.pq.push(val);
    this.siftUp(this.size - 1);
  }

  peak() {
    return this.pq[0];
  }

  remove(val) {
    const pq = this.pq
    const idx = pq.indexOf(val);
    if (idx > -1) {
        this.swap(idx, this.size - 1)
        pq.pop();
        if (idx < pq.length) {
            this.heapifyDown(idx);
        }
    }
  }

  pull() {
    const val = this.pq[0];
    this.swap(0, this.size - 1);
    this.pq.pop();
    this.siftDown(0);
    return val;
  }
}
