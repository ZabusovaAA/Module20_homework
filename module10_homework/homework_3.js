//10.4 задание 3 - инвертируем строку

const str = 'I love JavaScript';
const arr = str.split('');
const reverse_arr = [...arr].reverse(); // Создаем копию массива
const reverse_str = reverse_arr.join('');
console.log(reverse_str);