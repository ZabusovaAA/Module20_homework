function IsPrime(num) {
  let flag = 0;
  if (num > 1000) {
    console.log(`Данные неверны`);
   } else if (num == 0 || num == 1){
     console.log(`Число ${num} не является ни простым, ни составным`);
   } else {
     for (let i = 2; i < num/2 + 1; i++){
       if (num % i == 0){
         console.log(`Число ${num} составное`);
         i = num/2;
         flag = 1;
       }
     }
     if (flag == 0){
     console.log(`Число ${num} простое`);
    } 
  }
  return undefined;
}

let num = prompt(`Введите любое целое число от 0 до 1000 включительно:`)
IsPrime(num);