// // Fisher-Yates shuffle algorithm
// export default function fisherYatesShuffle(array) {
//     const arr = array.slice(); // copy to avoid mutating original
//     for (let i = arr.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [arr[i], arr[j]] = [arr[j], arr[i]];
//     }
//     return arr;
// }

// /*

// function lcg(seed) {
//     const m = 2 ** 31;
//     const a = 1103515245;
//     const c = 12345;
//     seed = (a * seed + c) % m;
//     return seed / m;
//   }

//   function fisherYatesWithLCG(array, seed = 12345) {
//     const arr = array.slice();
//     for (let i = arr.length - 1; i > 0; i--) {
//       seed = (1103515245 * seed + 12345) % (2 ** 31); // LCG step
//       const rand = seed / (2 ** 31);
//       const j = Math.floor(rand * (i + 1));
//       [arr[i], arr[j]] = [arr[j], arr[i]];
//     }
//     return arr;
//   }

//   */
// Fisher-Yates shuffle algorithm with optional custom RNG
export default function fisherYatesShuffle(array, rng = Math.random) {
  const arr = array.slice(); // copy to avoid mutating original
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Create an LCG-based RNG function
export function createLCG(seed = 12345) {
  let state = seed;
  const m = 2 ** 31;
  const a = 1103515245;
  const c = 12345;

  return function () {
    state = (a * state + c) % m;
    return state / m; // scale to 0-1 like Math.random
  };
}
