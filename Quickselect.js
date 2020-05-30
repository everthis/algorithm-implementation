function QuickSelect(array, k, comparator) {
  const compare = comparator || defaultcomparator;
  if (array.length < k) {
    return array;
  }
  const idx = select(array, k, compare);
  if (idx !== k) console.log("could not complete quickselect");
  return array;
}
const defaultcomparator = (a, b) => a < b;
function swap(array, index1, index2) {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}
function partition(array, leftindex, rightindex, pivotindex, compare) {
  const pivotvalue = array[pivotindex];
  swap(array, pivotindex, rightindex);
  let storeindex = leftindex;
  for (let i = leftindex; i < rightindex; i += 1) {
    if (compare(array[i], pivotvalue)) {
      swap(array, storeindex, i);
      storeindex += 1;
    }
  }
  swap(array, rightindex, storeindex);
  return storeindex;
}
function select(array, k, compare) {
  let leftindex = 0;
  let rightindex = array.length - 1;
  while (true) {
    if (leftindex == rightindex) return leftindex;
    let pivotindex = leftindex + Math.floor((rightindex - leftindex) / 2);
    pivotindex = partition(array, leftindex, rightindex, pivotindex, compare);
    if (k === pivotindex) return k;
    if (k < pivotindex) rightindex = pivotindex - 1;
    else leftindex = pivotindex + 1;
  }
}
