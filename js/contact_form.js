/**
 * Denna fil hanterar kontaktformuläret på sidan "Kontakta oss"
 * Meddelande till sidoadministratören: meddelandet från användaren skickas inte någonstans just nu, detta kommer att åtgärdas vid betalning
 */

/**
 * Denna funktionen exekveras när en användare trycker på "Skicka Meddelande"
 */
function submitForm() {
    createVariables();
    alert(checkForm());
}

/**
 * Skapar globala variabler
 */
function createVariables() {
    messageTitle = document.getElementById("messageTitle").value;
    messageContent = document.getElementById("messageContent").value;

    ticketAbout = document.getElementById("ticketAbout").value;
    ticketMethod = document.getElementById("ticketMethod").value;

    contactName = document.getElementById("contactName").value;
    contactEmail = document.getElementById("contactEmail").value;
    contactPhone = document.getElementById("contactPhone").value;
}

/**
 * Validera formen, returnera felmedellande ifall det inte funkar
 * Annars skickas en bekräftelse ifall allt stämmer
 */
function checkForm() {
    if (messageTitle == "" ||
        messageContent == "" ||
        ticketAbout == "" ||
        ticketMethod == "") {
        return "FEL! \nFyll i alla fält under rubrikerna \"Meddelande\" och \"Ärende\"";
    }

    switch (ticketMethod) {
        case "Email": {
            if (contactEmail == "" || contactName == "") {
                return "FEL! \nIfall du vill kontaktas via email måste du ange din e-postadress och namn";
                break;
            }
        }
        case "Telefon": {
            if (contactPhone == "" || contactName == "") {
                return "FEL! \nIfall du vill kontaktas via telefon måste du ange ditt telefonnummer och namn";
                break;
            }
        }
    }
    
    return printForm();
}

/**
 * Printar ut formen som användaren fyllt i
 */
function printForm() {
    let message =  ("-- MEDDELANDET HAR SKICKATS --" +
    "\nRubrik: " + messageTitle +
    "\nMeddelande: " + messageContent +
    "\nÄrende: " + ticketAbout +
    "\n\nKontaktmetod: " + ticketMethod);

    if (contactName != "") message += "\nNamn: " + contactName;
    if (contactEmail != "") message += "\nEmail: " + contactEmail;
    if (contactPhone != "") message += "\nTelefon: " + contactPhone; 

    return message;
}