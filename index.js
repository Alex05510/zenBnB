fetch("zenbnb.json")
  .then(function(response) {
    if(!response.ok){
      throw new Error("Erreur : La page Json n'a pas pu etre charger");
    }
    return response.json();
  })
  .then(function(data){

// Liste des ID récupérés dans le HTML
let logementMoins80 = document.getElementById("logement-moins-80");
let logementEntre80Et120 = document.getElementById("logement-entre-80-et-120");
let logementHautDeGamme = document.getElementById("logement-haut-de-gamme");
let logementWifi = document.getElementById("logement-wifi");
let logementSuperhost = document.getElementById("logement-superhost");
let logementVueMer = document.getElementById("logement-vue-mer");

// Parcours du tableau JSON
for (let i = 0; i < data.listings.length; i++) {
    let logement = data.listings[i];
    

    let logementDiv = document.createElement("div");
    logementDiv.classList.add("listings");

    // Style selon la note
    if (logement.rating >= 4.5) {
        logementDiv.style.backgroundColor = "#d4edda"; // Note >= 4.5 : Vert clair
    } else if (logement.rating < 3.5) {
        logementDiv.style.backgroundColor = "#f8d7da"; // Note < 3.5 : Rouge clair
    }

    // Informations sur le logement
    let titre = document.createElement("h2");
    titre.textContent = logement.title;

    let description = document.createElement("p");
    description.textContent = logement.description;

    let city = document.createElement("p");
    city.textContent = logement.city;

    let price = document.createElement("p");
    price.textContent = logement.price_per_night + "€/nuit";

    let rating = document.createElement("p");
    rating.textContent = "Noté " + logement.rating + " / 5 étoiles";

    let guest = document.createElement("p");
    guest.textContent = logement.guest_capacity + " pers";

    let image = document.createElement("img");
    image.src = logement.image;

    let tagsContainer = document.createElement("div");
    logement.tag.forEach(function(tag) {
        let tagElement = document.createElement("span");
        tagElement.textContent = tag;
        tagElement.classList.add("tag");
        tagsContainer.appendChild(tagElement);
    });

    let wifiIcon = document.createElement("span");
    wifiIcon.textContent = logement.wifi ? "✅ WI-FI" : "❌ WI-FI";

    let superhostIcon = document.createElement("span");
    superhostIcon.textContent = logement.superhost ? "⭐ Superhost" : "";

    // Ajout des éléments au div du logement
    logementDiv.appendChild(titre);
    logementDiv.appendChild(description);
    logementDiv.appendChild(city);
    logementDiv.appendChild(price);
    logementDiv.appendChild(rating);
    logementDiv.appendChild(guest);
    logementDiv.appendChild(image);
    logementDiv.appendChild(tagsContainer);
    logementDiv.appendChild(wifiIcon);
    logementDiv.appendChild(superhostIcon);

    // Catégorisation des logements
    if (logement.price_per_night < 80) {
        logementMoins80.appendChild(logementDiv);
    } else if (logement.price_per_night >= 80 && logement.price_per_night <= 120) {
        logementEntre80Et120.appendChild(logementDiv);
    } else if (logement.price_per_night > 120) {
        logementHautDeGamme.appendChild(logementDiv);
    }

    if (logement.wifi) {
        logementWifi.appendChild(logementDiv.cloneNode(true)); // Cloner pour éviter de déplacer
    }

    if (logement.superhost) {
        logementSuperhost.appendChild(logementDiv.cloneNode(true));
    }

    if (logement.seaView) {
        logementVueMer.appendChild(logementDiv.cloneNode(true));
    }
}
})


/************************************************************************************************************************************************************ */
document.addEventListener("DOMContentLoaded", function() {
  let savedName = localStorage.getItem("fullname");
  let savedEmail = localStorage.getItem("email");

  if (savedName && savedEmail) {
    document.getElementById("saved-data").textContent = 
    "fullname :" + savedName + " | email : " + savedEmail;
  }
});
//alert("coucou")
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("fullname").value.trim();
  let email = document.getElementById("email").value.trim();

  localStorage.setItem("fullname", name);
  localStorage.setItem("email", email);

  document.getElementById("saved-data").textContent =
  "fullname : " + name + " | email " + email;

  alert("Données enregistrées !");
});

document.getElementById("form").addEventListener("submit", function(e){
  e.preventDefault();


  const fullname = document.getElementById("fullname").value.trim();
  const adress = document.getElementById("adress").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const houseType = document.getElementById("houseType").value;
  const rooms = document.getElementById("rooms").value;
  const people = parseInt(document.getElementById("people").value);
  const arrivalDate = new Date(document.getElementById("arrivalDate").value);
  const departDate = new Date(document.getElementById("departDate").value);
  const driver = document.getElementById("driver").checked;
  const breakfast = document.getElementById("breakfast").checked;
  const guide = document.getElementById("guide").checked;
  const diet = document.getElementById("diet").value.trim();

  const errors = [];

  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  const phoneRegex = /^[0-9\s-/]{10,14}$/;

  if (fullname.length < 2) errors.push("Nom invalide, au moins 2 caractères");
  if (adress.length < 5) errors.push("adress invalide, au moins 5 caractères");
  if (!emailRegex.test(email)) errors.push("Format d'email invalide.");
  if (!phoneRegex.test(phone)) errors.push("Format de téléphone invalide");
  if (!arrivalDate) errors.push("Date d'arrivée non spécifiée");
  if (!departDate || new Date(departDate) <= new Date(arrivalDate)) {  
    errors.push("Date de départ invalide");
  }
  if (breakfast && diet.length === 0) errors.push("Veuillez preciser votre régime alimentaire");

  const errorBox = document.getElementById("errors");
  const resultBox = document.getElementById("result");

  if (errors.length > 0) {
    errorBox.innerHTML = "<strong>❌Erreur :</strong>" + errors.join("<br>");
    resultBox.innerHTML = "";
  } else {
    errorBox.innerHTML = "";
    
    const oneDay = 24 * 60 * 60 * 1000;
    const nights = Math.round((departDate - arrivalDate) / oneDay);

    if (nights <= 0) {
      errorBox.innerHTML = "<strong>Erreur :</strong> La date d'arrivée doit être avant la date de départ.";
      return;
    }

   
    let total = 100; 
    if(houseType === "maison"){
      total += 200 * nights;
    }
    if(houseType === "appartement"){
      total += 150 * nights;
    }
    if(houseType === "igloo") {
      total+= 500 * nights;
    }
    total += driver ? 11 * nights : 0;
    total += breakfast ? 15 * nights * people : 0; 
    total += guide ? 20 : 0; 
    total += rooms ? parseInt(rooms) * 5 : 0; 
    total += diet ? 5 * nights * people : 0; 

    resultBox.innerHTML = `
      <strong>✅Réservation Validée :</strong><br>
      Nom : ${fullname}<br>
      Adresse : ${adress}<br>
      Email : ${email}<br>
      Téléphone : ${phone}<br>
      Logement : ${houseType}<br>
      Nombre de personnes : ${people}<br>
      Nombre de nuits : ${nights}<br>
      Date d'arrivée : ${arrivalDate.toLocaleDateString()}<br>
      Date de départ : ${departDate.toLocaleDateString()}<br>
      Services : ${driver ? "chauffeur, " : ""}${breakfast ? "Petit-déjeuner, " : ""}${guide ? "Guide, " : ""}${diet ? "Régime alimentaire" : ""}<br>
      <strong>Coût total estimé : ${total}€</strong>
    `;
  }
});

document.getElementById("houseType").addEventListener("change", function () {
  const specificOption = document.getElementById("specificOptions");
  const gardenOrPoolOption = document.getElementById("gardenOrPoolOption");
  const balconyOrElevator = document.getElementById("balconyOrElevator");

  if (this.value === "maison") {
      specificOption.style.display = "block";
      gardenOrPoolOption.style.display = "block";
      balconyOrElevator.style.display = "none";
  } else if (this.value === "appartement") {
      specificOption.style.display = "block";
      gardenOrPoolOption.style.display = "none";
      balconyOrElevator.style.display = "block";
  } else {
      specificOption.style.display = "none";
      gardenOrPoolOption.style.display = "none";
      balconyOrElevator.style.display = "none";
  }
});

document.getElementById("breakfast").addEventListener("change", function() {
  const dietOption = document.getElementById("dietOptions");
  dietOption.style.display = this.checked ? "block" : "none";
});
  
