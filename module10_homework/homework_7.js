//10.6 ������� 7 - ������� ����� �����, ������ � �������� ����� � �������

const arr = [1, 3, 5, 8, 10, 12, 16, 0, 0, null, 'sadf', 13.44, 12.666, 666];

let count_even = 0;
let count_odd = 0;
let count_zero = 0;

arr.forEach(function(item, index, array){
  if (!isNaN(item) && item != null) {
   if (item == 0) {
        count_zero++;
        } else if (item % 2 == 0) {
             count_even++;
        } else if (item % 2 == 1) {
          count_odd++;
        }
  }
  })

console.log("���������� ����� � �������: " + count_zero);
console.log("���������� ������ ����� � �������: " + count_even);
console.log("���������� �������� ����� � �������: " + count_odd);