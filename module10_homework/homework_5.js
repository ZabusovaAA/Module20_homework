//10.5 ������� 5 - ������� ����� � �������� �������

const arr = [1, 3, 5, 7, 9];
console.log('Array length is ' + arr.length);
function arrPrint (item, index, arr){
  console.log(item);
  return item;
}
let temp= arr.map(arrPrint);