var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// DOM //
var reportChistes = [];
var reportJokes = [];
var respuesta = document.getElementById("respuesta");
var contenido_div = document.getElementById("scores_button");
var contador1 = 0;
var contador2 = 0;
// Función para llamar a la API de chistes
function jokesApi() {
    return __awaiter(this, void 0, void 0, function () {
        var API_URL, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('https://icanhazdadjoke.com/', {
                            headers: {
                                'accept': 'application/json'
                            }
                        })];
                case 1:
                    API_URL = _a.sent();
                    return [4 /*yield*/, API_URL.json()];
                case 2:
                    data = _a.sent();
                    guardarDatos(data.joke);
                    contador1++;
                    return [2 /*return*/, data.joke];
                case 3:
                    error_1 = _a.sent();
                    console.log('el error es el: ' + error_1);
                    return [2 /*return*/, ""];
                case 4: return [2 /*return*/];
            }
        });
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
            "<button id=\"like\" class=\"col-3\" onclick=\"asignar_score(1)\" ><i class=\"fas fa-smile fa-2x\"></i></button>\n            <button id=\"igual\" class=\"col-3\" onclick=\"asignar_score(2)\" ><i class=\"fas fa-meh fa-2x\"></i></button>\n            <button id=\"dissLike\" class=\"col-3\" onclick=\"asignar_score(3)\" ><i class=\"fas fa-frown fa-2x\"></i></button>";
    }
}
// Función encargada de guardar el chiste obtenido de la API en un array, además de invocar la función para mostrar este chiste en pantalla.
function guardarDatos(datos) {
    reportChistes.push({ joke: datos });
    mostrar_chiste(datos);
}
// Función que se encarga de asignar una puntuación a un chiste específico
function asignar_score(clicado) {
    var ultimo_chiste = reportChistes[reportChistes.length - 1];
    var obj = { joke: ultimo_chiste.joke, score: clicado };
    reportJokes = reportJokes.filter(function (o) { return o.joke !== obj.joke; });
    reportJokes.push(obj);
    fecha_valoracion();
}
// Función que se encarga de asignar la fecha actual a la puntuación de un chiste en particular. Luego imprime en consola el array de chistes puntuados.
function fecha_valoracion() {
    var asignarfecha = reportJokes[reportJokes.length - 1];
    var fechaNueva = new Date().toISOString();
    asignarfecha.date = fechaNueva;
    console.log(reportJokes);
}
// Función para pedir a la API el tiempo actual así como la geolocalización
var API_URL_WEATHER = "https://api.weatherapi.com/v1";
var weatherIcon = document.getElementById("weatherIcon");
var weatherInfo = document.getElementById("weatherInfo");
var API_KEY = '1c9c6cb101e7e4d9930b3d50a680e21a';
function getWeather() {
    navigator.geolocation.getCurrentPosition(function (success) {
        var _a = success.coords, latitude = _a.latitude, longitude = _a.longitude;
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=".concat(latitude, "&lon=").concat(longitude, "&units=metric&appid=").concat(API_KEY))
            .then(function (response) { return response.json(); })
            .then(function (data) {
            var temp = data.main.temp;
            if (weatherInfo) {
                weatherInfo.innerHTML = "".concat(Math.trunc(temp), "\u00BAC");
            }
            var icon = data.weather[0].icon;
            if (weatherIcon) {
                weatherIcon.src = "https://openweathermap.org/img/wn/".concat(icon, "@2x.png");
            }
        });
    });
}
getWeather();
function NorrisApi() {
    return __awaiter(this, void 0, void 0, function () {
        var url, options, response, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = 'https://api.chucknorris.io/jokes/random';
                    options = {
                        method: 'GET',
                        headers: {
                            'accept': 'application/json'
                        }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url, options)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _a.sent();
                    guardarDatos(result.value);
                    contador2++;
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function Change_joke() {
    contador1 <= contador2 ? jokesApi() : NorrisApi();
}
