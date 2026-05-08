
// STATE


let state = {

  transport: 0,
  food: 0,
  numerique: 0

};






function saveData(){

  localStorage.setItem(

    "carbonData",

    JSON.stringify(state)

  );

}



// TRANSPORT API


function loadTransport(){

 
  const km =
  document.getElementById("km").value;

  // url api
  const url =
  "https://impactco2.fr/api/v1/transport?km="
  + km +
  "&displayAll=1&language=fr";

  
  const xhr =
  new XMLHttpRequest();

  
  xhr.open(
    "GET",
    url,
    true
  );

  
  xhr.onreadystatechange = function () {

   
    if (xhr.readyState === 4 && xhr.status === 200) {

      
      const data =
      JSON.parse(xhr.responseText);

     
      const select =
      document.getElementById("transport");

     
      select.innerHTML = "";

      // boucle données
      data.data.forEach(item => {

        
        if(item.value && item.name){

          
          const opt =
          document.createElement("option");

        
          opt.value =
          item.value;

          
          opt.textContent =
          item.name;

          // ajout option
          select.appendChild(opt);

        }

      });

    }

  };

  
  xhr.send();

}


loadTransport();



// CALCUL TRANSPORT


function calcTransport(){

  const km =
  Number(
    document.getElementById("km").value
  );

  const value =
  Number(
    document.getElementById("transport").value
  );

  // calcul carbone
  state.transport =
  km * value;

  // affichage
  document.getElementById("resTransport")
  .textContent =

  state.transport.toFixed(2)
  + " kgCO₂e";

  // save
  saveData();

}



// FOOD API

let foodData = [];

// url
const foodUrl =
"https://impactco2.fr/api/v1/alimentation?category=group&language=fr";


const xhr2 =
new XMLHttpRequest();

// ouverture
xhr2.open(
  "GET",
  foodUrl,
  true
);


xhr2.onreadystatechange = function () {

  
  if (xhr2.readyState === 4 && xhr2.status === 200) {

    
    const data =
    JSON.parse(xhr2.responseText);

   
    foodData =
    data.data ;

    
    const category =
    document.getElementById("category");

    
    category.innerHTML = "";

    
    const def =
    document.createElement("option");

    def.textContent =
    "Choisir catégorie";

    def.value = "";

    category.appendChild(def);

    
    foodData.forEach(group => {

      // création option
      const opt =
      document.createElement("option");

      
      opt.value =
      group.slug;

      // texte
      opt.textContent =
      group.name;

      
      category.appendChild(opt);

    });

  }

};


xhr2.send();



// CHANGE CATEGORY


document.getElementById("category")
.addEventListener("change", function(){

  const group =
  foodData.find(

    g => g.slug === this.value

  );

 
  const food =
  document.getElementById("food");


  food.innerHTML = "";

  
  if(!group) return;

 
  group.items.forEach(item => {

    // création option
    const opt =
    document.createElement("option");

    // valeur carbone
    opt.value =
    item.ecv;

    // texte
    opt.textContent =
    item.slug;

    
    food.appendChild(opt);

  });

});



// CALCUL FOOD


function calcFood(){

  // valeur carbone
  const ecv =
  Number(
    document.getElementById("food").value
  );

  
  const qty =
  Number(
    document.getElementById("qty").value
  );

  
  state.food =
  ecv * qty;

 
  document.getElementById("resFood")
  .textContent =

  state.food.toFixed(2)
  + " kgCO₂e";

 
  saveData();

}



// NUMERIQUE API


let numData = [];

// url
const numUrl =
"https://impactco2.fr/api/v1/thematiques/ecv/1?detail=0&language=fr";


const xhr3 =
new XMLHttpRequest();


xhr3.open(
  "GET",
  numUrl,
  true
);


xhr3.onreadystatechange = function () {

  if (xhr3.readyState === 4 && xhr3.status === 200) {

   
    const data =
    JSON.parse(xhr3.responseText);

  
    numData =
    data.data ;

    
    const select =
    document.getElementById("numerique");

  
    select.innerHTML = "";

    numData.forEach(item => {


      const opt =
      document.createElement("option");

      
      opt.value =
      item.ecv || item.value ;

   
      opt.textContent =
      item.name || item.label;

      // ajout
      select.appendChild(opt);

    });

  }

};


xhr3.send();


// CALCUL NUMERIQUE

function calcNumerique(){

  
  const ecv =
  Number(
    document.getElementById("numerique").value
  );


  const qty =
  Number(
    document.getElementById("numQty").value
  );

  
  state.numerique =
  ecv * qty;

 
  document.getElementById("resNumerique")
  .textContent =

  state.numerique.toFixed(2)
  + " kgCO₂e";


  saveData();

}