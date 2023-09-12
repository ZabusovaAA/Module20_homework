function naturalNumRowPrint(a, b){
const intervalID = setInterval ( function () {
  console.log(a);
  a++;
  if (a > b) clearInterval(intervalID);
  }, 1000);
} 

naturalNumRowPrint(5, 15);