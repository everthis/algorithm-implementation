// https://segmentfault.com/a/1190000003914228
function manacher(s) {
    // Preprocess
    s = '#' + s.split('').join('#') + '#';

    let RL = new Array(s.length).fill(0);
    let MaxRight = 0;
    let pos = 0;
    let MaxLen = 0;

    for (let i = 0; i < s.length; i++) {
        if (i < MaxRight) {
            RL[i] = Math.min(RL[2 * pos - i], MaxRight - i);
        } else {
            RL[i] = 1;
        }
        // Try to expand, taking care of boundaries
        while (i - RL[i] >= 0 && i + RL[i] < s.length && s[i - RL[i]] === s[i + RL[i]]) {
            RL[i]++;
        }
        // Update MaxRight and pos
        if (RL[i] + i - 1 > MaxRight) {
            MaxRight = RL[i] + i - 1;
            pos = i;
        }
        // Update the length of the longest palindromic substring
        MaxLen = Math.max(MaxLen, RL[i]);
    }
    return MaxLen - 1;
}

