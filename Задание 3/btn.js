const resultNode = document.querySelector('.j-result');
const wsUrl = "wss://echo-ws-service.herokuapp.com";

let response;

let websocket = new WebSocket(wsUrl);

websocket.onmessage = function(event){
  let response = event.data;
  displayMessage(response, "response");
  return response;
}

btn.addEventListener("click", function(){
  const message = document.querySelector('#message').value;
  websocket.send(message);
  displayMessage(message, "card");
})

function displayMessage(myString, myClass) {
  resultNode.innerHTML += `<div class = "${myClass}">${myString}</div>`;
}

btn_geo.addEventListener('click', function(){
   if(!navigator.geolocation){
    displayMessage("Геолокация не поддерживается браузером", "response");
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
})

const success = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const mapLink = `<a class = "card" target = "_blank" style="color: blue" href = https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}>Геолокация</a>`
  resultNode.innerHTML += mapLink;
}

const error = () => {
  displayMessage("Определить местоположение не удалось", "card");
}
