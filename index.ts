// DOM //
let reportChistes: { joke: string }[] = [];
let reportJokes: { joke: string, score: number, date?: string }[] = [];
let respuesta = document.getElementById("respuesta");
let contenido_div = document.getElementById("scores_button");
let contador1 = 0;
let contador2 = 0;

// Función para llamar a la API de chistes
async function jokesApi(): Promise<string> {
    try {
        const API_URL = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'accept': 'application/json'
            }
        });
        let data = await API_URL.json();
        guardarDatos(data.joke);
        contador1++;
        return data.joke;
    } catch (error) {
        console.log('el error es el: ' + error);
        return "";
    }
}

// Función encargada de mostrar el chiste obtenido desde la API 
function mostrar_chiste(mostrarChiste: string): void {
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
function pintar_botones(): void {
    if (contenido_div) {
        contenido_div.innerHTML =
            `<button id="like" class="col-3" onclick="asignar_score(1)" ><i class="fas fa-smile fa-2x"></i></button>
            <button id="igual" class="col-3" onclick="asignar_score(2)" ><i class="fas fa-meh fa-2x"></i></button>
            <button id="dissLike" class="col-3" onclick="asignar_score(3)" ><i class="fas fa-frown fa-2x"></i></button>`;
    }
}

// Función encargada de guardar el chiste obtenido de la API en un array, además de invocar la función para mostrar este chiste en pantalla.
function guardarDatos(datos: string): void {
    reportChistes.push({ joke: datos });
    mostrar_chiste(datos);
}

// Función que se encarga de asignar una puntuación a un chiste específico
function asignar_score(clicado: number): void {
    let ultimo_chiste = reportChistes[reportChistes.length - 1];
    let obj = { joke: ultimo_chiste.joke, score: clicado };
    reportJokes = reportJokes.filter(o => o.joke !== obj.joke);
    reportJokes.push(obj);
    fecha_valoracion();
}

// Función que se encarga de asignar la fecha actual a la puntuación de un chiste en particular. Luego imprime en consola el array de chistes puntuados.
function fecha_valoracion(): void {
    let asignarfecha = reportJokes[reportJokes.length - 1];
    let fechaNueva = new Date().toISOString();
    asignarfecha.date = fechaNueva;
    console.log(reportJokes);
}

// Función para pedir a la API el tiempo actual así como la geolocalización
const API_URL_WEATHER = "https://api.weatherapi.com/v1";
const weatherIcon = document.getElementById("weatherIcon") as HTMLImageElement;
const weatherInfo = document.getElementById("weatherInfo");
const API_KEY = '1c9c6cb101e7e4d9930b3d50a680e21a';

function getWeather(): void {
    navigator.geolocation.getCurrentPosition((success) => {
        let { latitude, longitude } = success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                let { temp } = data.main;
                if (weatherInfo) {
                    weatherInfo.innerHTML = `${Math.trunc(temp)}ºC`;
                }
                let icon = data.weather[0].icon;
                if (weatherIcon) {
                    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                }
            });
    });
}

getWeather();

async function NorrisApi(): Promise<void> {
    const url = 'https://api.chucknorris.io/jokes/random';
    const options = {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        guardarDatos(result.value);
        contador2++;
    } catch (error) {
        console.error(error);
    }
}

function Change_joke(): void {
    contador1 <= contador2 ? jokesApi() : NorrisApi();
}