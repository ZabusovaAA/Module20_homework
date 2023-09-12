const pow = (x, n) => {
  let res = x;
  for (let i = 1; i < n; i++) {
    res = res * x;
  }
  return res;
  // return Math.pow(x, n);
}

console.log(pow(2,6));