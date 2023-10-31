export default function sameElementCheck(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  const sortedArr1 = array1.slice().sort();
  const sortedArr2 = array2.slice().sort();

  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }

  return true;
}
