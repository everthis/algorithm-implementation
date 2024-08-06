/**
 * @param {any[]} arr
 * @returns {void}
 */
function shuffle(arr) {
  // modify the arr inline to change the order randomly
  for(let n = arr.length, i = n - 1; i >= 0; i--) {
    const idx = Math.floor(Math.random() * (i + 1))
    ;[arr[idx], arr[i]] = [arr[i], arr[idx]]
  }
}
