// Remove array element dupes
function removeDuplicates(a) {
  return Array.from(new Set(a));
}

// Merge Sort

function merge(left, right) {
  let sortedArr = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) sortedArr.push(left.shift());
    else sortedArr.push(right.shift());
  }
  return [...sortedArr, ...left, ...right];
}

function mergeSort(arr) {
  if (arr.length === 0) return null;
  if (arr.length === 1) return arr;
  else {
    // find middle
    let mid = Math.floor(arr.length / 2);

    // sort left
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));
    return merge(left, right);
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

export { removeDuplicates, merge, mergeSort, prettyPrint };
