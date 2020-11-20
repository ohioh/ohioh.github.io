(function () {
    'use strict';

let installButton = document.getElementByID("installButton");
let deferredPrompt;
// did we launch as a PWA?
var urlParams = new URLSearchParams(window.location.search);

// look for the source parameter, if it's `pwa` then it's installed
if (urlParams.get('source') === 'pwa') {
  console.log('[OHIOH] Launched as PWA');

  // add the PWA moniker to the title
  let theTitle = document.getElementById('title');
  theTitle.innerHTML = theTitle.innerHTML + ' (PWA)';
}

installButton.onclick = doInstall;

// installButton.addEventListener('click', (e) => {
//   // Hide the app provided install promotion
//   hideMyInstallPromotion();
//   // Show the install prompt
//   deferredPrompt.prompt();
//   // Wait for the user to respond to the prompt
//   deferredPrompt.userChoice.then((choiceResult) => {
//   if (choiceResult.outcome === 'accepted') {
//     console.log('[OHIOH]User accepted the install prompt');
//   } else {
//     console.log('[OHIOH] User dismissed the install prompt');
//    }
//   });
// });

window.addEventListener('beforeinstallprompt', event => {
  console.log('[OHIOH]: beforeinstallprompt')
        // don't allow the browser to do its install, we want to do it when the user
        // taps our install button
  event.preventDefault();
        // stash the event object so we can use it later (when the user taps the
        // install button)
  deferredPrompt = event;
        // now unhide the Install button so the user can tap it!
  installButton.style.display = 'block';
});

// register an event listener for after the app installs
window.addEventListener('appinstalled', event => {
  console.log('[OHIOH} App Installed');
});



})();
