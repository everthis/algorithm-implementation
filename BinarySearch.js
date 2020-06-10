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
