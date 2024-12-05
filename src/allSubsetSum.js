function allSubSetSum(arr = []) {
    const set = new Set();
    const n = arr.length;
    for (let i = 0; i < (1 << n); i++) {
        let tmp = 0;
        for (let j = 0; j < n; j++) {
            if (i & (1 << j) !== 0) tmp += arr[j];
        }
        set.add(tmp);
    }
    return set;
};
