function nthElement(arr, n, compareFn) {
  if (n < 0 || n >= arr.length) {
    throw new Error("Invalid index")
  }

  const partition = (arr, left, right, pivotIndex) => {
    const pivotValue = arr[pivotIndex]
    ;[arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]]
    let storeIndex = left

    for (let i = left; i < right; i++) {
      if (compareFn(arr[i], pivotValue) < 0) {
        ;[arr[i], arr[storeIndex]] = [arr[storeIndex], arr[i]]
        storeIndex++
      }
    }

    ;[arr[right], arr[storeIndex]] = [arr[storeIndex], arr[right]]
    return storeIndex
  }

  const select = (arr, left, right, k) => {
    if (left === right) {
      return arr[left]
    }

    let pivotIndex = Math.floor(Math.random() * (right - left + 1)) + left
    pivotIndex = partition(arr, left, right, pivotIndex)

    if (k === pivotIndex) {
      return arr[k]
    } else if (k < pivotIndex) {
      return select(arr, left, pivotIndex - 1, k)
    } else {
      return select(arr, pivotIndex + 1, right, k)
    }
  }

  return select(arr, 0, arr.length - 1, n)
}
