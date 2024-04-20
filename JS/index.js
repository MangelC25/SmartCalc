import { navbar } from "./Header/navbar.js";
import { calculadora } from "./Calculadora/Calcualdora.js";
import { History } from "./History/History.js";
import { Memory } from "./Memoria/Memoria.js";
import NavResposive from "./Header/navbatToggle.js";

document.addEventListener("DOMContentLoaded", function () {
    navbar();
    calculadora();
    History();
    Memory();
    NavResposive();
});