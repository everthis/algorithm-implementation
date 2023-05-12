class SegNode {
  constructor(l, r, state) {
    this.l = l;
    this.r = r;
    this.state = state;
    this.left = null;
    this.right = null; 
  }
}

function SegmentTree() {
    let root = new SegNode(0, 1e9, false);
    return { update, query, add, remove }
    function update(node, l, r, state) {
        if (l <= node.l && r >= node.r) {
            node.state = state;
            node.left = null;
            node.right = null;
            return node.state;
        }
        if (l >= node.r || r <= node.l) return node.state;
        let mid = node.l + parseInt((node.r - node.l) / 2);
        if (node.left == null) {
            node.left = new SegNode(node.l, mid, node.state);
            node.right = new SegNode(mid, node.r, node.state);
        }
        let left = update(node.left, l, r, state);
        let right = update(node.right, l, r, state);
        node.state = left && right;
        return node.state;
    }
    function query(l, r) {
        return dfs(root, l, r);
    }
    function dfs(node, l, r) {
        if (l >= node.r || r <= node.l) return true;
        if ((l <= node.l && r >= node.r) || (node.left == null)) return node.state;
        let mid = node.l + parseInt((node.r - node.l) / 2);
        if (r <= mid) {
            return dfs(node.left, l, r);
        } else if (l >= mid) {
            return dfs(node.right, l, r);
        } else {
            return dfs(node.left, l, r) && dfs(node.right, l, r);
        }
    }
    function add(l, r) {
        update(root, l, r, true);
    }
    function remove(l, r) {
        update(root, l, r, false);
    }
}
