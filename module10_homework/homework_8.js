//10.7 ������� 8 - ������� � ������� ������������� ������

let numbers = new Map([
  ["1", "one"],
  ["2", "two"],
  ["3", "three"],
  ["4", "four"],
  ["5", "five"],
  ["6", "six"],
  ["7", "seven"],
  ["8", "eight"],
  ["9", "nine"],
  ["10", "ten"],
  ["11", "eleven"],
  ["12", "twelve"]
]);

for (let num of numbers.keys()){
  console.log(`���� - ${num}, �������� - ${numbers.get(num)}`);
 } ����� � �������: " + count_odd);