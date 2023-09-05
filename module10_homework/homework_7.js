//10.6 задание 7 - —читаем число нулей, четных и нечетных чисел в массиве

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

console.log(" оличество нулей в массиве: " + count_zero);
console.log(" оличество четных чисел в массиве: " + count_even);
console.log(" оличество нечетных чисел в массиве: " + count_odd);