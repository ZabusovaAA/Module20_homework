//10.3 ������� 2 - ���������� ��� ����������

const x = null;
switch (typeof(x)) {
  case 'number':
    console.log('� - �����');
    break;
  case 'string':
    console.log('� - ������');
    break;
  case 'boolean':
    console.log('� - ���������� ����������');
    break;
  default: console.log('��� � �� ���������');