const resultNode = document.querySelector('.j-result');

btn.addEventListener("click", function(){
   const height = document.querySelector('#height').value;
   const width = document.querySelector('#width').value;
    if (height > 99 && height < 301 && width > 99 && width < 301) {
     const requestResult = useRequest(width, height, displayResult);
    } else {
    resultNode.innerHTML = 'Одно из чисел вне диапазона от 100 до 300';
   }  
})

function useRequest(width, height, callback) {
    let reqUrl = `https://picsum.photos/${width}/${height}`; // с ВПН
    //let reqUrl = `https://jsonplaceholder.typicode.com/photos?_limit=${value}`;
    
   fetch(reqUrl)
    .then((response) => { 
      console.log(response);
      return displayResult(response);})
    .catch(() => { console.log('error') });
};

function displayResult(apiData) {
  resultNode.innerHTML = `<div class="card">
           <img src="${apiData.url}"/>
         </div>`;
}