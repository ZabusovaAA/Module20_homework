//10.5 задание 5 - Выводим длину и элементы массива

const arr = [1, 3, 5, 7, 9];
console.log('Array length is ' + arr.length);
function arrPrint (item, index, arr){
  console.log(item);
  return item;
}
let temp= arr.map(arrPrint);