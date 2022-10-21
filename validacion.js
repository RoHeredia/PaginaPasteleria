/*     Asociación de eventos     */ 

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("formularioContacto").addEventListener('submit', validarFormulario);
  document.getElementById("cpButton").addEventListener('click', obtenerZonas);
});

/*    Validación del formulario de contacto      */ 

function validarFormulario(evento) {
  let mensajesError = [];
  var nombre = document.getElementById('name').value;
  if (!nombre || nombre == '' || nombre.length == 0) {
      mensajesError.push("Debe ingresar su nombre.");
  }
  var email = document.getElementById('email').value;
  if (!email || email == '' || email.length == 0) {
      mensajesError.push("Debe ingresar su email.");
  }
  var telefono = document.getElementById('phone').value;
  if (!telefono || telefono == '' || telefono.length == 0) {
      mensajesError.push("Debe ingresar su número de teléfono.");
  }
  var mensaje = document.getElementById('message').value;
  if (!mensaje || mensaje == '' || mensaje.length == 0) {
      mensajesError.push("Debe ingresar un mensaje.");
  }

  if (mensajesError.length > 0) {
      evento.preventDefault();
      alert(mensajesError.join('\n'));
      return;
  } else {
      return;
  }
}

/*     API      */ 

function obtenerZonas() {
  let cp = document.getElementById('cp').value;

  if (!cp || cp == '' || cp.length == 0) {
      alert("Debe ingresar un código postal.");
      return;
  } else if (parseInt(cp) < 1601 || parseInt(cp) > 9431) {
      alert("Debe ingresar un código postal entre 1601 y 9431.");
      return;
  }
  
  let zoneTextArea = document.getElementById('zone');
  zoneTextArea.innerHTML = '';

  let request = new XMLHttpRequest();
  request.open("GET", `https://api.zippopotam.us/AR/${cp}`);
  request.send();
  request.onload = () => {
      if (request.status === 200) {
          let jsonResponse = JSON.parse(request.response);
          console.log(jsonResponse);

          if(jsonResponse && jsonResponse.places.length > 0) {
              let zonas = [];
              for(var i = 0; i < jsonResponse.places.length; i++) {
                  zonas.push(jsonResponse.places[i]['place name']);
              }
              zoneTextArea.innerHTML = zonas.join('\n');
          }
      } else {
          alert("No se encontraron datos para el código postal ingresado.");
      }
  }
}