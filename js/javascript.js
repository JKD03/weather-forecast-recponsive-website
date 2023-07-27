const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherPart = wrapper.querySelector(".weather-part"),
wIcon = weatherPart.querySelector("img"),
arrowBack = wrapper.querySelector("header i");
var imagetext;
var cloud2="clouds";
var cold="cold";
var cold2="winter";
var rain="rain";
var rain2="rainy";
var snow="snow";
var snow2="snowy";
var Storm="storm";
var sunny="sunny";
var sunny2="hot";
var tornado="tornado";
var clear="clear";
const val=0;



let api;

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
});

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f9638f588cd65df561803bd8274df89c`;
    fetchData();
}

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=f9638f588cd65df561803bd8274df89c`;
    fetchData();
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;
        if(id == 800){
            wIcon.src = "icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "icons/storm.svg";  
        }else if(id >= 600 && id <= 622){
            wIcon.src = "icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "icons/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon.src = "icons/rain.svg";
        }
        
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        imagetext=description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
        myFunction();
    }
}

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});
  
  function haveCommonWordWithoutSpaces(str1, str2) {
    // Split the strings into individual words
    const words1 = str1.split(/\s+/);
    const words2 = str2.split(/\s+/);
  
    // Remove all blank spaces from each word
    const wordsWithoutSpaces1 = words1.map(word => word.replace(/\s/g, ''));
    const wordsWithoutSpaces2 = words2.map(word => word.replace(/\s/g, ''));
  
    // Check if there is a word in common between the two arrays
    for (const word1 of wordsWithoutSpaces1) {
      for (const word2 of wordsWithoutSpaces2) {
        if (word1 === word2) {
          return true;
        }
      }
    }
  
    return false;
  }

function myFunction() {
    const imageElement1 = document.getElementById('imgchange1');
    const imageElement2 = document.getElementById('imgchange2');
    imageElement1.classList.add('rounded-faded-image');
    imageElement2.classList.add('rounded-faded-image');
    if(haveCommonWordWithoutSpaces(imagetext,cloud2)) {
        imageElement1.src = 'weather/clouds.png';
        imageElement2.src = 'weather/clouds.png';
        imageElement1.alt = 'Clouds';
    }
    else if(haveCommonWordWithoutSpaces(imagetext,cold)) {
        imageElement1.src = 'weather/cold.jpg';
        imageElement2.src = 'weather/cold.jpg';
        imageElement1.alt = 'Cold';
    }
    else if(haveCommonWordWithoutSpaces(imagetext,cold2)) {
        imageElement1.src = 'weather/cold.jpg';
        imageElement2.src = 'weather/cold.jpg';
        imageElement1.alt = 'Cold';
    }
    else if(haveCommonWordWithoutSpaces(imagetext,rain)) {
        imageElement1.src = 'weather/rainy.png';
        imageElement2.src = 'weather/rainy.png';
        imageElement1.alt = 'Rainy';
    }
    else if(haveCommonWordWithoutSpaces(imagetext,rain2)) {
        imageElement1.src = 'weather/rainy.png';
        imageElement2.src = 'weather/rainy.png';
        imageElement1.alt = 'Rainy';
    }
    else if(haveCommonWordWithoutSpaces(imagetext,snow)) {
        imageElement1.src = 'weather/snow.jpg';
        imageElement2.src = 'weather/snow.jpg';
        imageElement1.alt = 'Snow';
    }
    else if(haveCommonWordWithoutSpaces(imagetext,snow2)) {
        imageElement1.src = 'weather/snow.jpg';
        imageElement2.src = 'weather/snow.jpg';
        imageElement1.alt = 'Snow';
    }
    else if(haveCommonWordWithoutSpaces(imagetext,sunny)) {
        imageElement1.src = 'weather/sunny.png';
        imageElement2.src = 'weather/sunny.png';
        imageElement1.alt = 'Sunny';
    }
    else if(haveCommonWordWithoutSpaces(imagetext,sunny2)) {
        imageElement1.src = 'weather/sunny.png';
        imageElement2.src = 'weather/sunny.png';
        imageElement1.alt = 'Sunny';
    }
    else if(haveCommonWordWithoutSpaces(imagetext,tornado)) {
        imageElement1.src = 'weather/tornado.jpg';
        imageElement2.src = 'weather/tornado.jpg';
        imageElement1.alt = 'Tornado';
    }
    else if(haveCommonWordWithoutSpaces(imagetext,Storm)) {
        imageElement1.src = 'weather/storm.jpg';
        imageElement2.src = 'weather/storm.jpg';
        imageElement1.alt = 'Storm';
    }  
    else if(haveCommonWordWithoutSpaces(imagetext,clear)) {
        imageElement1.src = 'weather/clear.jpg';
        imageElement2.src = 'weather/clear.jpg';
        imageElement1.alt = 'Clear';
    }    
    else {
        imageElement1.src = 'images/slider-img.png';
        imageElement2.src = 'images/slider-img.png';
        imageElement1.alt = 'Image 2';
   }
}