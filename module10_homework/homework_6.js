//10.6 ������� 6 - ���������, ��� �� �������� ������� ���������

const arr = [1, 2, 2, 2, 2];
let flag = true;
for (let i = 0; i < arr.length - 1; i++) {
  flag = flag && (arr[i]==arr[i+1]);
}
if (flag == true) {
    console.log("��� �������� ���������");
  } else {
    console.log("�� ��� �������� ���������");
}nt);