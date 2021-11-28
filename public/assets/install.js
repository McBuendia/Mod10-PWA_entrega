'use strict';

let deferredInstallPrompt;
const installButton = document.getElementById('butInstall');
installButton.style.display = 'none';


// Agregar detector de eventos para el evento beforeinstallprompt 
window.addEventListener('beforeinstallprompt', (evt) => {
  // Evita que Chrome 67 y versiones anteriores muestren automáticamente el mensaje
  evt.preventDefault();
  
  // Guarda el evento para que pueda activarse más tarde.
  deferredInstallPrompt = evt;
  
  // Actualiza la interfaz de usuario para notificar al usuario que puede agregar a la pantalla de inicio 
  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {

    // Agregar codigo mostrar el mensaje de instalacion 
    deferredInstallPrompt.prompt();
    
    // esconde el boton de instalacion, no puede ser llamado 2 veces.
    installButton.style.display = 'none';

    // Registrar la respuesta del usuario a la solicitud
    deferredInstallPrompt.userChoice
      .then((choice) => {
        if (choice.outcome === 'accepted') {
          console.log('Usuario ha aceptado la invitacion A2HS', choice);
        } else {
          console.log('Usuario no ha aceptado la invitacion A2HS', choice);
        }
        deferredInstallPrompt = null;
      });
  });
});

// agregar un detector de eventos para el evento instalado en la aplicacion
window.addEventListener('appinstalled', logAppInstalled);

/**
 * Controlador de eventos para eventos instalados en la aplicacion
 * Registre la instalacion en analisis o guarde el evento de alguna manera
 *
 * @param {Event} evt
 */
function logAppInstalled(evt) {
  // Agregar código para registrar el evento
  console.log('Juego instalado', evt);

}