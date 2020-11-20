//Loading the Service Worker
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function () {
//         //then register  ServiceWorker
//         navigator.serviceWorker.register('../sw.js', {scope: "./"})
//         .then(function(reg) {
//             if(reg.installing) {
//                 console.log('[OHIOH] Service worker installing');
//               } else if(reg.waiting) {
//                 console.log('[OHIOH] Service worker installed');
//               } else if(reg.active) {
//                 console.log('[OHIOH] Service worker active');
//               }
//         }).catch(function(error) {
//             console.log("[OHIOH] ServiceWorker Error:)" + error);
//         })
//     })
// } else {
//     console.warn("[OHIOH] ServiceWorker not avaible");
// }
let PRECACHE = 'OHIOHCache-static';


// $(document).ready(function () {
//     'use strict'
//     navigator.serviceWorker.getRegistrations()
//         .then(function(registrations) {
//             for(let registration of registrations) {
//                 registration.unregister();
//             }
//         });
// })


if ('serviceWorker' in navigator) {

    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('[OHIOH] ServiceWorker registration successful with scope: ', registration.scope);
        swInstalled = true;
      }, function(err) {
        // registration failed :(
        console.log('[OHIOH] ServiceWorker registration failed: ', err);
      });
    });

  }



$(document).ready(function () {
    'use strict'

    var pwaVersion = '1.0.1'; //must be identical to _manifest.json version. If not it will create update window loop
    var pwaCookie = true; // if set to false, the PWA prompt will appear even if the user selects "maybe later"

    $('[data-pwa-version]').data('pwa-version', pwaVersion);


    //Creating Cookie System for PWA Hide

    function createCookie(e, t, n) {
        if (n) {
            var o = new Date;
            o.setTime(o.getTime() + 48 * n * 60 * 60 * 1e3);
            var r = "; expires=" + o.toGMTString()
        } else var r = "";
        document.cookie = e + "=" + t + r + "; path=/"
    }

    function readCookie(e) {
        for (var t = e + "=", n = document.cookie.split(";"), o = 0; o < n.length; o++) {
            for (var r = n[o];
                " " == r.charAt(0);) r = r.substring(1, r.length);
            if (0 == r.indexOf(t)) return r.substring(t.length, r.length)
        }
        return null
    }

    function eraseCookie(e) {
        createCookie(e, "", -1)
    }

    // //Enabling dismiss button
    // setTimeout(function () {
    //     $('.pwa-dismiss').on('click', function () {
    //         console.log('User Closed Add to Home / PWA Prompt')
    //         createCookie('OHIOH_pwa_rejected_install', true, 1);
    //         $('body').find('#menu-install-pwa-android, #menu-install-pwa-ios, .menu-hider').removeClass('menu-active');
    //     });
    // }, 1500);

    //Detecting Mobile Operating Systems
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.iOS() || isMobile.Windows());
        }
    };
    var isInWebAppiOS = (window.navigator.standalone == true);
    var isInWebAppChrome = (window.matchMedia('(display-mode: standalone)').matches);

    //Firing PWA prompts for specific versions and when not on home screen.
    if (isMobile.Android()) {
        console.log('[OHIOH] Android Detected');

        function showInstallPromotion() {
            if (!$('body').hasClass('is-installed')) {
                if ($('#menu-install-pwa-android, .add-to-home').length) {
                    console.log('[OHIOH]  Triggering PWA Menu for Android');
                    if (!readCookie('OHIOH_pwa_rejected_install')) {
                        setTimeout(function () {
                            $('.add-to-home').addClass('add-to-home-visible add-to-home-android');
                            $('#menu-install-pwa-android, .menu-hider').addClass('menu-active')
                        }, 4500);
                    }
                } else {
                    console.log('[OHIOH] The div #menu-install-pwa-android was not found. Please add this div to show the install window')
                }
            }
        }

        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            showInstallPromotion();
        });

        $('.pwa-install').on('click', function (e) {
            $('body').addClass('is-installed');
            deferredPrompt.prompt();
            deferredPrompt.userChoice
                .then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        //console.log('User accepted the A2HS prompt');
                    } else {
                        //console.log('User dismissed the A2HS prompt');
                    }
                    deferredPrompt = null;
                });
        });
        window.addEventListener('appinstalled', (evt) => {
            $('#menu-install-pwa-android, .menu-hider').removeClass('menu-active')
        });
    }

    if (isMobile.iOS()) {
        if (!isInWebAppiOS) {
            console.log('[OHIOH]  iOS Detected');
            if ($('#menu-install-pwa-ios, .add-to-home').length) {
                if (!readCookie('OHIOH_pwa_rejected_install')) {
                    console.log('[OHIOH]  Triggering PWA / Add to Home Screen Menu for iOS');
                    setTimeout(function () {
                        $('.add-to-home').addClass('add-to-home-visible add-to-home-ios');
                        $('#menu-install-pwa-ios, .menu-hider').addClass('menu-active');
                    }, 4500);
                };
            } else {
                console.log('[OHIOH] The div #menu-install-pwa-ios was not found. Please add this div to show the install window')
            }
        }
    }

    //Creating Update Modal
    function updateModal() {
        var body = $('body');
        var updateModal = $('#menu-update');
        var mt = new Date();
        var menuUpdate = mt.getHours() + ":" + mt.getMinutes() + ":" + mt.getSeconds();
        if (!updateModal.length) {
            body.append('<div id="menu-update"></div>');
            setTimeout(function () {
                body.find('#menu-update').load('menu-update.html?ver=' + menuUpdate);
            }, 250);
        }
    };


    //Update Version in 5 Seconds After New Version Detected
    function updateButton() {
        var counter = 3;
        var interval = setInterval(function () {
            counter--;
            console.log('[OHIOH]',counter);
            $('.page-update').html('Updating in ... ' + counter + ' seconds');
            if (counter == 0) {
                clearInterval(interval);
                window.location.reload()
            }
        }, 1000);
        caches.delete(PRECACHE).then(function () {
            console.log('[OHIOH] Content Updated - Cache Removed!');
        });
        localStorage.clear();
        sessionStorage.clear()
        caches.keys().then(cacheNames => {
            cacheNames.forEach(cacheName => {
                caches.delete(cacheName);
            });
        });
    };

    //Check Version
    function check_version() {
        if ($('link[data-pwa-version]').length) {
            function versionCheck() {
                var dt = new Date();
                var maniTimeVersion = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
                var localVersionNumber = $('link[rel="manifest"]').data('pwa-version');
                var onlineVersionJSON = "_manifest.json?ver=" + maniTimeVersion;
                var onlineVersionNumber = "Connection Offline. Waiting to Reconect";
                $.getJSON(onlineVersionJSON, function (onlineData) {
                    onlineVersionNumber = onlineData.version;
                });
                setTimeout(function () {
                    //console.log(' Checking PWA Content for updates...\n PWA Server Version: ' + onlineVersionNumber + '\n' + ' PWA Cached Version: ' + localVersionNumber);
                    if (onlineVersionNumber != localVersionNumber && onlineVersionNumber != "Connection Offline. Waiting to Reconect") {
                        updateModal();
                        console.log('[OHIOH]  New Version of Content Available. Refreshing. On Desktop Browsers a manual refresh maybe required.')
                        setTimeout(function () {
                            $('body').find('#menu-update').addClass('menu-active');
                            $('.menu-hider').addClass('menu-active-no-click');
                            updateButton();
                        }, 500);
                    }
                    if (onlineVersionNumber == localVersionNumber) {
                        /*No update required. Versions Identical*/
                    }
                    if (onlineVersionNumber === "undefined") {
                        /*Error Checking for Updates*/
                    }
                    if (onlineVersionNumber === "Finding Online Version...") {
                        $('.reloadme').addClass('disabled');
                        $('body').find('#menu-update').removeClass('menu-active');
                        $('.menu-hider').removeClass('menu-active-no-click');
                    }
                }, 3000);
            }
            //Checking for new version every 60 seconds
            setInterval(function () {
                versionCheck()
            }, 50000);
            //Initial Load Version Check in 10 Second After Load
            setTimeout(function () {
                versionCheck();
            }, 10000);
        }
    }

    if (pwaCookie == false) {
        eraseCookie('OHIOH_pwa_rejected_install');
    }

    //Reload To Clear Button
    $('body').on('click', '.page-update, .reloadme', function () {
        location.reload();
    });

    // //Check for Version Change if Online If not Kill the Function
    // if (navigator.onLine) {
    //     check_version();
    // } else {
    //     function check_version() {}
    // }


    // //Check if Online / Offline
    // function updateOnlineStatus(event) {
    //     var condition = navigator.onLine ? "online" : "offline";
    //     isOnline();
    //     console.log('[OHIOH] Connection: Online');
    //     $("a").off("click", returnFalse);
    // }

    // function updateOfflineStatus(event) {
    //     isOffline();
    //     $("a").on("click", returnFalse);
    //     console.log('[OHIOH] Connection: Offline');
    // }
    // // window.addEventListener('online', updateOnlineStatus);
    // // window.addEventListener('offline', updateOfflineStatus);





});
