function sum2(a){
  return function(b){
    return a + b;
  }
}
console.log(sum2(1)(2));