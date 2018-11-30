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

  var app = {
    perrosFilter : document.getElementById("perrosFilter"),
    perrosList: [],
    perrosLocalList: [],
  }


  var loadData = function(key, label){
    var xhttp = new XMLHttpRequest();
    var url = 'https://gaperris2.pythonanywhere.com/Perro/';

    xhttp.onreadystatechange = function() {
        if( this.readyState == 4 && this.status == 200 ){
            console.log( this.responseText );
            var data = JSON.parse( this.responseText );
            localStorage.setItem('perrosLocal', JSON.stringify( data ) );
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
      var botonAdoptar = document.createElement("button");

      console.log( perro )
      perroContainer.className = "perroContainer";
      fotoPerro.src = perro.fotografiaUrl;
      fotoPerro.alt = perro.nombre;
      nombreContainer.innerHTML = perro.nombre;
      razaContainer.innerHTML = "<b>Raza: </b>" +perro.raza;
      descripcionContainer.innerHTML = "<b>Descripción: </b>" +perro.descripcion;
      estadoContainer.innerHTML = "<b>Estado: </b>" +perro.estado;
      botonAdoptar.innerHTML = "Adoptar";

      // Agrega los hijos
      perroContainer.appendChild( nombreContainer );
      perroContainer.appendChild( fotoPerro );
      perroContainer.appendChild( razaContainer );
      perroContainer.appendChild( descripcionContainer );
      perroContainer.appendChild( estadoContainer );
      perroContainer.appendChild( botonAdoptar );

      // Agrega contenedor al html
      perrosContainer.appendChild( perroContainer );

    }

  }

  if(navigator.onLine){

    app.perrosFilter.addEventListener("change", function( e ) {
      var perrosFiltrados = app.perrosList.filter( function( perro ) {
          if( perro.estado == app.perrosFilter.value || app.perrosFilter.value == "TODOS" ) {
            return perro;
          }
      } );
      displayPerros( perrosFiltrados );
    });

    loadData();
  }else{

    var perroLocal = JSON.parse(localStorage.getItem( 'perrosLocal' ) );
    console.log(perroLocal);
    app.perrosLocalList = perroLocal.results;
    displayPerros( app.perrosLocalList );

    app.perrosFilter.addEventListener("change", function( e ) {
      var perrosFiltradosLocal = app.perrosLocalList.filter( function( perro ) {
          if( perro.estado == app.perrosFilter.value || app.perrosFilter.value == "TODOS" ) {
            return perro;
          }
      } );
      displayPerros( perrosFiltradosLocal );
    });

  }

  var select = document.getElementById("perrosFilter");
  var selectOption = select.options[select.selectedIndex];
  var lastSelected = localStorage.getItem('select');

  if(lastSelected) {
      select.value = lastSelected;
  }

  select.onchange = function () {
     lastSelected = select.options[select.selectedIndex].value;
     console.log(lastSelected);
     localStorage.setItem('select', lastSelected);
  }




})( );
