/**
 * Hanterar den globala menun som gör den responsiv för mobiler och paddor
 */
function menu() {
    let menu = document.getElementById("headerMenu");
    let icon = document.getElementById("menuButton");
    if (menu.className === "") {
      menu.className += "responsive";
      icon.innerHTML ="X";
    } else {
      menu.className = "";
      icon.innerHTML ="MENY";
    }
  }