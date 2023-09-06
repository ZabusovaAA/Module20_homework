//10.3 задание 2 - ќпредел¤ем тип переменной

const x = null;
switch (typeof(x)) {
  case 'number':
    console.log('х - число');
    break;
  case 'string':
    console.log('х - строка');
    break;
  case 'boolean':
    console.log('х - логическа¤ переменна¤');
    break;
  default: console.log('“ип х не определен');