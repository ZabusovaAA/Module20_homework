const resultNode = document.querySelector('.j-result');

btn.addEventListener("click", function(){
   const value = document.querySelector('input').value;
   if (value > 0 && value < 11) {
    useRequest(value, displayResult);
   } else {
    resultNode.innerHTML = 'Число вне диапазона или не число вообще!';
   }  
})

function useRequest(value, callback) {
    const xhr = new XMLHttpRequest();
    let reqUrl = `https://picsum.photos/v2/list?limit=${value}`; // с ВПН
    //let reqUrl = `https://jsonplaceholder.typicode.com/photos?_limit=${value}`;

    xhr.open('GET', reqUrl);

    xhr.onerror = function() {
      console.log('Ошибка запроса');
    };

    xhr.onload = function() {
    if (xhr.status != 200) {
      alert('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
       if (callback) {
         callback(result);
     }
    }
}
xhr.send();
console.log(result);
};

function displayResult(apiData) {
  let cards = '';
   apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
    resultNode.innerHTML = cards;
}