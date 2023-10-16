//Задание 2. Парсим JSON
const jsonString = `
{
  "list": [ {
    "name": "Petr",
    "age": "20",
    "prof": "mechanic"
   },
   {
    "name": "Vova",
    "age": "60",
    "prof": "pilot"
   } ]
  }
`
result = JSON.parse(jsonString); //получили объект

result.list.map(function(item){  //преобразуем возраст в число
  item.age = +item.age }
 )

console.log(result);