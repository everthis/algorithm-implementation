/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const BinarySearch = function(nums, target) {
  const n = nums.length
  let l = 0, r = n - 1
  while(l <= r) {
    const mid = l + ((r - l) >> 1)
    if(nums[mid] === target) return mid
    if(nums[mid] > target) r = mid - 1
    else l = mid + 1
  }
  return l
};


// find largest element that smaller than x
// same as upper_bound in C++
function binarySearch(arr, l, r, x) {
  while (l < r) {
    const mid = r - ((r - l) >> 1)
    if (arr[mid] > x) r = mid - 1
    else l = mid
  }
  return l
}
