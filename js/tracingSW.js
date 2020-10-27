(function () {
  'use strict';

  function doInstallTracing() {
    console.log('[OHIOH] You have installed the Tracing Feature.');
    // we've tapped the install button, so hide it
    installButton.style.display = 'none';
    // execute the deferred installation prompt
    deferredPrompt.prompt();
    // wait for the response from the deferred prompt
    deferredPrompt.userChoice.then(res => {
        // did the user approve installation?
        if (res.outcome === 'accepted') {
            console.log('[OHIOH] You have accepted  the Tracing Feature.');
        } else {
            console.log('[OHIOH] You have declined the Tracing Feature.');
        }
        // clear the deferred prompt object so we can only do this once
        deferredPrompt = null;
    });
  }

  // get a handle to the install button
  let installTracing = document.getElementById('installTracing');

  // now set the click handler for the install button
  installTracing.onclick = doInstallTracing;

  // create an object we'll use to hold the reference to the PWA install
  // event
  let deferredPrompt;

    // now add an event listener to respond to the event. Right before the browser
    // installs the PWA, it fires the beforeinstallprompt event. Here, we'll manage
    // the installation ourselves
  window.addEventListener('beforeinstallprompt', event => {
    console.log('[OHIOH]:  Fired beforeinstallprompt')
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
    console.log('[OHIOH] Tracing  Feature completly installed.');
  });

})();
