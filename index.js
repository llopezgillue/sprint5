"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// DOM //
let reportChistes = [];
let reportJokes = [];
let respuesta = document.getElementById("respuesta");
let contenido_div = document.getElementById("scores_button");
let contador1 = 0;
let contador2 = 0;

// Función para llamar a la API de chistes
function jokesApi() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const API_URL = yield fetch('https://icanhazdadjoke.com/', {
                headers: {
                    'accept': 'application/json'
                }
            });
            let data = yield API_URL.json();
            guardarDatos(data.joke);
            contador1++;
            return data.joke;
        }
        catch (error) {
            console.log('el error es el: ' + error);
            return "";
        }
    });
}
// Función encargada de mostrar el chiste obtenido desde la API 
function mostrar_chiste(mostrarChiste) {
    if (respuesta) {
        respuesta.innerHTML = mostrarChiste;
    }
    if (contenido_div) {
        if (contenido_div.innerHTML.trim() === "") {
            pintar_botones();
        }
    }
}
// Función que se encarga de generar el contenido HTML para los botones de puntuación de los chistes y asignarles el respectivo evento onclick.
function pintar_botones() {
    if (contenido_div) {
        contenido_div.innerHTML =
            `<button id="like" class="col-3" onclick="asignar_score(1)" ><i class="fas fa-smile fa-2x"></i></button>
            <button id="igual" class="col-3" onclick="asignar_score(2)" ><i class="fas fa-meh fa-2x"></i></button>
            <button id="dissLike" class="col-3" onclick="asignar_score(3)" ><i class="fas fa-frown fa-2x"></i></button>`;
    }
}
// Función encargada de guardar el chiste obtenido de la API en un array, además de invocar la función para mostrar este chiste en pantalla.
function guardarDatos(datos) {
    reportChistes.push({ joke: datos });
    mostrar_chiste(datos);
}
// Función que se encarga de asignar una puntuación a un chiste específico
function asignar_score(clicado) {
    let ultimo_chiste = reportChistes[reportChistes.length - 1];
    let obj = { joke: ultimo_chiste.joke, score: clicado };
    reportJokes = reportJokes.filter(o => o.joke != obj.joke);
    reportJokes.push(obj);
    fecha_valoracion();
}
// Función que se encarga de asignar la fecha actual a la puntuación de un chiste en particular. Luego imprime en consola el array de chistes puntuados.
function fecha_valoracion() {
    let asignarfecha = reportJokes[reportJokes.length - 1];
    let fechaNueva = new Date().toISOString();
    asignarfecha.date = fechaNueva;
    console.log(reportJokes);
    return reportJokes;
}
// Función para pedir a la API el tiempo actual asi como la geolocalizacion
 
const API_URL_WEATHER = "http://api.weatherapi.com/v1";
const weatherIcon = document.getElementById("weatherIcon");
const weatherInfo = document.getElementById("weatherInfo");
const API_KEY = '1c9c6cb101e7e4d9930b3d50a680e21a';
function getWeather() {
    navigator.geolocation.getCurrentPosition((success) => {  
        let { latitude, longitude } = success.coords; 
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`) 
            .then(response => response.json())  
            .then(data => { 
            let { temp } = data.main;  
            weatherInfo.innerHTML = `${Math.trunc(temp)}ºC`;  
            let icon = data.weather[0].icon; 
            weatherIcon.src =`http://openweathermap.org/img/wn/${icon}@2x.png` ; 
        });
    });
}
getWeather();


function NorrisApi() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://api.chucknorris.io/jokes/random';
        const options = {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        };
        try {
            const response = yield fetch(url, options);
            const result = yield response.json();
            guardarDatos(result.value);
            contador2++;
        }
        catch (error) {
            console.error(error);
        }
    });
}
function Change_joke() {
    contador1 <= contador2 ? jokesApi() : NorrisApi();
} 