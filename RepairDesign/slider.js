//массивы с данными
images = ["png/slider_1.png", "png/slider_2.png", "png/slider_3.png"];
city = ["Rostov-on-Don", "Sochi", "Rostov-on-Don"];
dept = ["LCD admiral", "Theives", "Patriotic"];
area = ["81 m2", "105 m2", "93 m2"];
time = ["3.5 months", "4 months", "3 months"];

//функция переключения активного набора данных
function setActive(index){
    for (let k = 1; k <= 3; k++) {
        if (k === index) {
            document.querySelector(`.n${k}`).classList.add("chosen");
            document.querySelector(`.n${k}_navi_icon`).setAttribute('fill-opacity', 1);
        } else {
            document.querySelector(`.n${k}`).classList.remove("chosen");
            document.querySelector(`.n${k}_navi_icon`).setAttribute('fill-opacity', 0.3);
        }
    }
    document.querySelector(".curr_image").src = images[index-1];
    document.querySelector(".curr_image").setAttribute("data-index",`${index}`);
    document.querySelector(".completed__parameter_city").innerHTML=city[index-1];
    document.querySelector(".completed__parameter_dept").innerHTML=dept[index-1];
    document.querySelector(".completed__parameter_area").innerHTML=area[index-1];
    document.querySelector(".completed__parameter_time").innerHTML=time[index-1];
}

//обработка кликов на элементы меню завершенных проектов
let itm = document.getElementsByClassName("completed__items");
for (let i = 0; i < itm.length; i++) {
    itm[i].addEventListener("click", function() {
        setActive(i+1); 
 } ) }

//обработка кликов на навигационные точки
 let itmdot = document.getElementsByClassName("navi__dot"); 
 for (let i = 0; i < itm.length; i++) {
    itmdot[i].addEventListener("click", function() {
        setActive(i+1); 
 } ) }

//стрeлки
left_arrow.addEventListener("click", function() {
    const elem = document.querySelector(".curr_image");
    const index = elem.getAttribute("data-index");
    if (index === "1") {
        elem.setAttribute("data-index",`${images.length}`);
        setActive(images.length);
    } else {
        elem.setAttribute("data-index",`${index - 1}`);
        setActive(+index - 1);
        };
    });

right_arrow.addEventListener("click", function() {
    const elem = document.querySelector(".curr_image")
    const index = elem.getAttribute("data-index");
    if (index === `${images.length}`) {
        elem.setAttribute("data-index","1");
        setActive(1);
    } else {
        elem.setAttribute("data-index",`${index + 1}`);
        setActive(+index + 1);
    };
});



