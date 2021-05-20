/**
 * Denna fil hanterar bara copyright footern, skulle vilja slå ihop menu.js+copyright.js till miscellaneous.js.
 * Men eftersom det inte går pga. att type="module" behöver inkluderas för att menun ska funka går det inte.
 */

main();

/**
 * Starta applikationen
 */
function main() {
    updateCopyrightYear();
}


/**
 * Hämtar dagens årtal och uppdaterar datumet i footern
 * detta så att webbsidans ägare inte varje år behöver gå in på alla html filer och uppdatera årtalet
 */
function updateCopyrightYear() {
  let footer = document.getElementsByTagName("footer");
  let footerText = footer[0].firstElementChild;
  footerText.innerHTML = "&copy; Copyright "+ new Date().getFullYear()  +" | Djupvikshamn.se <br /><a href=\"mailto:info@djupvikshamn.se\">Mail: info@djupvikshamn.se</a>";
}