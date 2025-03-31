fetch("zenbnb.json")
  .then(function(response) {
    if(!response.ok){
      throw new Error("Erreur : La page Json n'a pas pu etre charger");
    }
    return response.json();
  })
  .then(function(data){
    let categorieLogement = document.getElementById("logements");

    for (let i = 0; i < data.listings.length; i++){
      let logement = data.listings[i];
      if (logement.city === "Paris") {

      let titre = document.createElement("h2");
      titre.textContent = logement.title;
      let description = document.createElement("p");
      description.textContent = logement.description;
      let city = document.createElement("p");
      city.textContent = logement.city;
      let price = document.createElement("p");
      price.textContent = logement.price_per_night + " € /nuit";
      let rating = document.createElement("p");
      rating.textContent = logement.rating + " / 5. étoiles";
      let guest = document.createElement("p");
      guest.textContent = "Prevus pour " + logement.guest_capacity + " pers";
      let image = document.createElement("img");
      image.src = logement.image;

      categorieLogement.appendChild(titre);
      categorieLogement.appendChild(description);
      categorieLogement.appendChild(city);
      categorieLogement.appendChild(price);
      categorieLogement.appendChild(rating);
      categorieLogement.appendChild(guest);
      categorieLogement.appendChild(image);
    }
  }
});
   