document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formulario").addEventListener('submit', validarFormulario); 
  });
  
  function validarFormulario(evento) {
    evento.preventDefault();
    var nombre = document.getElementById('text').value;
    if(usuario.length == 0) {
      alert('No has escrito nada en el nombre');
      return;
    }
}