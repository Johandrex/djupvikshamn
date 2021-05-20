/**
 * Hanterar väderdata
 */
import { getData } from "./weather_fetch.js";

const DAYS = 2;
const SEARCH_FROM_TIME = 6; // sök från 06:00
const SEARCH_SKIP_TIME = 6; // skippa 6 timmar
const SEARCH_TO_TIME = 19; // sluta söka vid 19:00
const SEARCH_UTC = 2; // lägg till 2 timmar då tiden gäller UTC+2

const WEATHER_DESCRIPTION = [
    "Kunde inte hämta data", // vid fel
    "Klar himmel",
 	"Nästan klar himmel",
 	"Enstaka moln",
 	"Halvklar himmel",
 	"Molnigt",
 	"Mulet",
 	"Dimma",
 	"Lätta regnskurar",
 	"Måttliga regnskurar",
 	"Tunga regnskurar",
 	"Åskväder",
 	"Lätt snöblandat regnskurar",
 	"Måttligt snöblandat regnskurar",
 	"Tungt snöblandat regnskurar",
 	"Lätta snöskurar",
 	"Måttliga snöskurar",
 	"Tunga snöskurar",
 	"Lätt regn",
 	"Måttligt regn",
 	"Tungt regn",
 	"Åska",
 	"Lätt snöblandat regn",
 	"Måttligt snöblandat regn",
 	"Tungt snöblandat regn",
 	"Lätt snöfall",
 	"Måttligt snöfall",
 	"Tungt snöfall"
]

main();

/**
 * Starta applikationen
 */
function main() {
    getData().then(printResults);
}

/**
 * För inhämtad data på websidan
 * @param {*} data 
 */
function printResults(data) {
    console.log(data);

    let nextDay = false;
    let currentDate = new Date();
    let dates = [];

    // hämta nästa timmes data så länge det inte handlar om kl 6, 12 eller 18
    if (currentDate.getHours() != (6 - 1) && currentDate.getHours() != (12 - 1) && currentDate.getHours() != (18 - 1)) { // snygga till
        currentDate.setHours(currentDate.getHours()+1, 0, 0, 0);
        dates.push(currentDate);
    }

    /**
     * Hämtar dagens och morgondagens datum kl 6, 12 och 18.
     */
    for (let i = 0; i < DAYS; ++i) {
        for (let ii = SEARCH_FROM_TIME; ii < SEARCH_TO_TIME; ii += SEARCH_SKIP_TIME) {
            currentDate = new Date();
            if (nextDay) currentDate.setDate(currentDate.getDate() + 1);
            currentDate.setHours(ii, 0, 0, 0);

            dates.push(currentDate);
        }
        
        nextDay = true;
    }

    let foundDates = [];

    /**
     * Lägg in alla timeSeries som hittas i en lista
     */
    for (let i = 0; i < dates.length; ++i) {
        for (let ii = 0; ii < data.timeSeries.length; ++ii) {
            let checkDate = new Date(data.timeSeries[ii].validTime);
            if (dates[i].getTime() === checkDate.getTime()) {
                foundDates.push(data.timeSeries[ii]);
                break;
            }
        }
    }

    /**
     * Hämtar data utifrån parameterna
     * https://opendata.smhi.se/apidocs/metfcst/parameters.html
     */
    for (let i = 0; i < foundDates.length; ++i) {
        let currentDate = new Date();
        let date = new Date(foundDates[i].validTime);

        // kolla vilken dag det handlar om
        let table = document.getElementById("smhi-today").getElementsByTagName('tbody')[0];
        if (currentDate.getDay() !== date.getDay()) {
            table = document.getElementById("smhi-tomorrow").getElementsByTagName('tbody')[0];
        }

        // sätt in alla celler för 1 rad
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        
        // TID I TIMMAR
        cell1.innerHTML = date.getHours();
        
        date = foundDates[i];
        let search_t = 0; // temp
        let search_ws = 0; // ws
        let search_wd = 0; // wind degree
        let search_Wsymb2 = 0; // beskrivning

        // SAMLA DATA
        for (let ii = 0; ii < date.parameters.length; ++ii) {
            if (date.parameters[ii].name == "t")
            search_t = date.parameters[ii].values[0];
            else if (date.parameters[ii].name == "ws")
            search_ws = date.parameters[ii].values[0];
            else if (date.parameters[ii].name == "wd")
            search_wd = date.parameters[ii].values[0];
            else if (date.parameters[ii].name == "Wsymb2")
            search_Wsymb2 = date.parameters[ii].values[0];
        }

        // TEMPERATUR, CELSIUS
        cell2.innerHTML = search_t;

        // VIND, RIKTNING + M/S
        cell3.innerHTML = "<span id=\"smhi-arrow"+i+"\">&#8681;</span>" + " (" + search_ws + ")";
        let arrow = document.getElementById("smhi-arrow"+i);
        let degrees = search_wd; // RITKNING, GRADER
        arrow.style.transform = "rotate("+degrees+"deg)"; // ROTERA, utifrån http://snowfence.umn.edu/Components/winddirectionanddegreeswithouttable3.htm

        // HIMMEL, BESKRIVNING
        cell4.innerHTML = WEATHER_DESCRIPTION[search_Wsymb2];
    }
}