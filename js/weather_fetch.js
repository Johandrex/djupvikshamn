/**
 * Hämta data från API, returnera sedan till showResults()
 */

/* VISBY
const LATITUD = 57.6297;
const LONGITUD = 18.2519;
*/

const LATITUD = 57.3081;
const LONGITUD = 18.1489;

const URL = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/"+LONGITUD+"/lat/"+LATITUD+"/data.json";

export function getData() {
    return fetch(URL)
        .then(function (response) {
            return response.json();
        })
}