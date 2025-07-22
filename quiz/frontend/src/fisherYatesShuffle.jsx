// Fisher-Yates shuffle algorithm
export default function fisherYatesShuffle(array) {
    const arr = array.slice(); // copy to avoid mutating original
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/*

function lcg(seed) {
    const m = 2 ** 31;
    const a = 1103515245;
    const c = 12345;
    seed = (a * seed + c) % m;
    return seed / m;
  }

  
  function fisherYatesWithLCG(array, seed = 12345) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      seed = (1103515245 * seed + 12345) % (2 ** 31); // LCG step
      const rand = seed / (2 ** 31);
      const j = Math.floor(rand * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  
  */