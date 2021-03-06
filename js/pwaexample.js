if ('serviceWorker' in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register('../sw.js').then(function(registration) {
    console.log('Service worker registration succeeded:', registration);

    // At this point, you can optionally do something
    // with registration. See https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
  }).catch(function(error) {
    console.log('Service worker registration failed:', error);
  });

  // Independent of the registration, let's also display
  // information about whether the current page is controlled
  // by an existing service worker, and when that
  // controller changes.

  // First, do a one-off check if there's currently a
  // service worker in control.
  if (navigator.serviceWorker.controller) {
    console.log('This page is currently controlled by:', navigator.serviceWorker.controller);
  }

  // Then, register a handler to detect when a new or
  // updated service worker takes control.
  navigator.serviceWorker.oncontrollerchange = function() {
    console.log('This page is now controlled by:', navigator.serviceWorker.controller);
  };
} else {
  console.log('Service workers are not supported.');
}
