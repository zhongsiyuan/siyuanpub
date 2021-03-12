function quicksort(arr = []) {
  if (!Array.isArray(arr)) {
    throw new TypeError('param arr must be an array');
  }

  if (arr.length <= 1) {
    return arr;
  }

  const centerIndex = Math.floor(arr.length / 2);
  const center = arr[centerIndex];
  const leftArr = [];
  const rightArr = [];

  for (let index = 0; index < arr.length; index += 1) {
    if (centerIndex === index) {
      continue;
    }

    const currentValue = arr[index];
    if (currentValue > center) {
      rightArr.push(currentValue);
    } else {
      leftArr.push(currentValue);
    }
  }

  return quicksort(leftArr).concat(center, quicksort(rightArr));
}

const arr = [98, 42, 25, 54, 15, 3, 25, 72, 41, 10, 121];
console.log(quicksort(arr).length, arr.length, quicksort(arr));
