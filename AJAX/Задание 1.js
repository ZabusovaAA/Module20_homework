//Задание 1. Парсим XML
const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
   <student>
    <name lang="ru">
       <first>Петр</first>
      <second>Петров</second>
    </name>
     <age>58</age>
     <prof>driver</prof>
   </student>
</list>
`;

const parser = new DOMParser();
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

let resArr = [];
let i = 0;

for (let dom of xmlDOM.querySelectorAll("student")) {
  resArr[i] = {
    name: `${dom.querySelector("first").textContent} ${dom.querySelector("second").textContent}`,    
    age: Number(dom.querySelector("age").textContent),
    prof: dom.querySelector("prof").textContent,
    lang: dom.querySelector("name").getAttribute('lang'),
   }
  i++;
 }

let result = new Object();
result.list = resArr;
    
console.log(result);