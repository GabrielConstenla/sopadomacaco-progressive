(function() {

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
                 .register('./service-worker.js')
                 .then(function() {
                     console.log('Service Worker Registered');
                });
    }
})( );


(function() {

  var txtApiData = document.getElementById( "txtApiData" );
  var selectedPerros = [];

  var app = {
    perrosFilter : document.getElementById("perrosFilter"),
    perrosList: [],
  }

  //load old data

  // if(localStorage.getItem( "selectedPerros" )){
  //   selectedPerros = JSON.parse( localStorage.getItem("selectedPerros") );
  // }

  var loadData = function(){
    var xhttp = new XMLHttpRequest();
    var url = "https://gaperris2.pythonanywhere.com/Perro/";

    // xhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //        var data = this.responseText;
    //        txtApiData.style.color= "black";
    //        txtApiData.innerHTML = data;
    //
    //        perros = JSON.parse(data);
    //
    //        for(let i in perros.results){
    //          displayPerros( perros.results[ i ], i );
    //        }
    //
    //     } else {
    //       txtApiData.style.color = "red";
    //       txtApiData.innerHTML = data;
    //     }
    // };
    // xhttp.open("GET", url , true);
    // xhttp.send();

    xhttp.onreadystatechange = function() {
        if( this.readyState == 4 && this.status == 200 ){
            console.log( this.responseText );
            var data = JSON.parse( this.responseText );
            displayPerros( data.results );
            app.perrosList = data.results;
        }
    }
    xhttp.open( 'GET', url, true );
    xhttp.send();

  }



  var displayPerros = function( perros ){

    var perrosContainer = document.getElementById("perrosContainer")
    perrosContainer.innerHTML = "";

    for ( let perro of perros ){
      var perroContainer = document.createElement( "div" );
      var nombreContainer = document.createElement("h3");
      var fotoPerro = document.createElement("img");
      var razaContainer = document.createElement("p");
      var descripcionContainer = document.createElement("p");
      var estadoContainer = document.createElement("p");

      //para ponerle color al seleccionarlo

      // if(selectedPerros[ i ] ){
      //   perroContainer.className = "perroContainer selected"
      // }else{
      //   perroContainer.className = "perroContainer"
      // }
      //
      // perroContainer.addEventListener("click", function( mouse ){
      //
      //   if(!this.selected){
      //     perroContainer.className = "perroContainer selected"
      //     this.selected = true;
      //     selectedPerros[ i ] = true;
      //     saveData( "selectedPerros", selectedPerros );
      //   }else{
      //     perroContainer.className = "perroContainer";
      //     this.selected = false;
      //     selectedPerros[ i ] = false;
      //     saveData("selectedPerros", selectedPerros);
      //   }
      //   console.log("selected");
      // });

      console.log( perro )
      perroContainer.className = "perroContainer";
      fotoPerro.src = perro.fotografiaUrl;
      fotoPerro.alt = perro.nombre;
      nombreContainer.innerHTML = perro.nombre;
      razaContainer.innerHTML = "<b>Raza: </b>" +perro.raza;
      descripcionContainer.innerHTML = "<b>Descripción: </b>" +perro.descripcion;
      estadoContainer.innerHTML = "<b>Estado: </b>" +perro.estado;

      // Agrega los hijos
      perroContainer.appendChild( nombreContainer );
      perroContainer.appendChild( fotoPerro );
      perroContainer.appendChild( razaContainer );
      perroContainer.appendChild( descripcionContainer );
      perroContainer.appendChild( estadoContainer );

      // Agrega contenedor al html
      perrosContainer.appendChild( perroContainer );

    }


    // var perroContainer = document.createElement( "div" );
    // var nombreContainer = document.createElement("h3");
    // var fotoPerro = document.createElement("img");
    // var razaContainer = document.createElement("p");
    // var descripcionContainer = document.createElement("p");
    // var estadoContainer = document.createElement("p");
    //
    // //para ponerle color al seleccionarlo
    //
    // if(selectedPerros[ i ] ){
    //   perroContainer.className = "perroContainer selected"
    // }else{
    //   perroContainer.className = "perroContainer"
    // }
    //
    // perroContainer.addEventListener("click", function( mouse ){
    //
    //   if(!this.selected){
    //     perroContainer.className = "perroContainer selected"
    //     this.selected = true;
    //     selectedPerros[ i ] = true;
    //     saveData( "selectedPerros", selectedPerros );
    //   }else{
    //     perroContainer.className = "perroContainer";
    //     this.selected = false;
    //     selectedPerros[ i ] = false;
    //     saveData("selectedPerros", selectedPerros);
    //   }
    //   console.log("selected");
    // });
    // console.log( perro )
    // fotoPerro.src = perro.fotografiaUrl;
    // fotoPerro.alt = perro.nombre;
    // nombreContainer.innerHTML = perro.nombre;
    // razaContainer.innerHTML = "<b>Raza: </b>" +perro.raza;
    // descripcionContainer.innerHTML = "<b>Descripción: </b>" +perro.descripcion;
    // estadoContainer.innerHTML = "<b>Estado: </b>" +perro.estado;
    //
    // // Agrega los hijos
    // perroContainer.appendChild( nombreContainer );
    // perroContainer.appendChild( fotoPerro );
    // perroContainer.appendChild( razaContainer );
    // perroContainer.appendChild( descripcionContainer );
    // perroContainer.appendChild( estadoContainer );
    //
    // // Agrega contenedor al html
    // perrosContainer.appendChild( perroContainer );

  }

  var saveData = function( key, data ) {
      var toSave = JSON.stringify( data );
      localStorage.setItem( key, toSave );
  }

  app.perrosFilter.addEventListener("change", function( e ) {
    var perrosFiltrados = app.perrosList.filter( function( perro ) {
        if( perro.estado == app.perrosFilter.value || app.perrosFilter.value == "TODOS" ) {
          return perro;
        }
    } );
    displayPerros( perrosFiltrados );
  });

  loadData();

  //logica de caches

  if ('caches' in window) {
    /*
     * Check if the service worker has already cached this city's weather
     * data. If the service worker has the data, then display the cached
     * data while the app fetches the latest data.
     */
    caches.match(url).then(function(response) {
      if (response) {
        response.json().then(function updateFromCache(json) {
          var results = json.query.results;
          results.key = key;
          results.label = label;
          results.created = json.query.created;
        });
      }
    });
  }


})( );
