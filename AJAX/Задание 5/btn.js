const resultNode = document.querySelector('.j-result');

if (localStorage.getItem("myCards")) {
  resultNode.innerHTML = localStorage.getItem("myCards")
}

btn.addEventListener("click", function(){
   const pnumber = document.querySelector('#page_number').value;
   const limit = document.querySelector('#limit').value;
   if (pnumber > 0 && pnumber < 11 && limit > 0 && limit < 11) {
     const requestResult = useRequest(pnumber, limit, displayResult);
   } else if ((pnumber < 0 || pnumber > 10 || !Number.isInteger(+pnumber)) && (limit < 0 || limit > 10 || !Number.isInteger(+limit))) {
    resultNode.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10';
   } else if (pnumber < 0 || pnumber > 10 || !Number.isInteger(+pnumber)) {
    resultNode.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
   } else if (limit < 0 || limit > 10 || !Number.isInteger(+limit)) {
    resultNode.innerHTML = 'Лимит вне диапазона от 1 до 10';
   }
})

function useRequest(pnumber, limit, callback) {
   let reqUrl = `https://picsum.photos/v2/list?page=${pnumber}&limit=${limit}`; //с ВПН
           
   fetch(reqUrl)
    .then((response) => { 
      return response.json();})
     .then((json) => {
      console.log(json);
      return displayResult(json);})
     .catch(() => { console.log('error') });
};

function displayResult(apiData) {
  localStorage.removeItem("myCards");
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
    localStorage.setItem("myCards", cards);
}

btn_reset.addEventListener('click', function(){
  if (localStorage.getItem("myCards")) {
    resultNode.innerHTML = localStorage.removeItem("myCards");
    resultNode.innerHTML = 'Тут будут картинки';
  }
})