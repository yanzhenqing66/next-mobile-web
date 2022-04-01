
export const arrayEquals = (array1, array2) => {
  return  array1.length == array2.length && new Set(array1.concat(array2)).size === array1.length
  // return array1.length == array2.length && array1.every(function (v, i) { return v === array2[i] })
}
