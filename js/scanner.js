

  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }



  window.addEventListener('DOMContentLoaded', function() {
    const searchParams = new URL(location).searchParams;
    const inputs = Array.from(document.querySelectorAll('input[id]'));

    inputs.forEach(input => {
      if (searchParams.has(input.id)) {
        if (input.type == 'checkbox') {
          input.checked = searchParams.get(input.id);
        } else {
          input.value = searchParams.get(input.id);
          input.blur();
        }
      }
      if (input.type == 'checkbox') {
        input.addEventListener('change', function(event) {
          const newSearchParams = new URL(location).searchParams;
          if (event.target.checked) {
            newSearchParams.set(input.id, event.target.checked);
          } else {
            newSearchParams.delete(input.id);
          }
          history.replaceState({}, '', Array.from(newSearchParams).length ?
              location.pathname + '?' + newSearchParams : location.pathname);
        });
      } else {
        input.addEventListener('input', function(event) {
          const newSearchParams = new URL(location).searchParams;
          if (event.target.value) {
            newSearchParams.set(input.id, event.target.value);
          } else {
            newSearchParams.delete(input.id);
          }
          history.replaceState({}, '', Array.from(newSearchParams).length ?
              location.pathname + '?' + newSearchParams : location.pathname);
        });
      }
    });
  });






  var ChromeSamples = {
    log: function() {
      var line = Array.prototype.slice.call(arguments).map(function(argument) {
        return typeof argument === 'string' ? argument : JSON.stringify(argument);
      }).join(' ');

      document.querySelector('#log').textContent += line + '\n';
    },

    clearLog: function() {
      document.querySelector('#log').textContent = '';
    },

    setStatus: function(status) {
      document.querySelector('#status').textContent = status;
    },

    setContent: function(newContent) {
      var content = document.querySelector('#content');
      while(content.hasChildNodes()) {
        content.removeChild(content.lastChild);
      }
      content.appendChild(newContent);
    }
  };



  if (/Chrome\/(\d+\.\d+.\d+.\d+)/.test(navigator.userAgent)){
    // Let's log a warning if the sample is not supposed to execute on this
    // version of Chrome.
    if (79 > parseInt(RegExp.$1)) {
      ChromeSamples.setStatus('Warning! Keep in mind this sample has been tested with Chrome ' + 79 + '.');
    }
  }





  
    
      async function onButtonClick() {
  

  let options = {};
  options.acceptAllAdvertisements = true;
  
   try {
    log('Requesting Bluetooth Scan with options: ' + JSON.stringify(options));
    const scan = await navigator.bluetooth.requestLEScan(options);

    log('Scan started with:');
    log(' acceptAllAdvertisements: ' + scan.acceptAllAdvertisements);
    log(' active: ' + scan.active);
    log(' keepRepeatedDevices: ' + scan.keepRepeatedDevices);
    log(' filters: ' + JSON.stringify(scan.filters));

  
         //prefixes of implementation that we want to test
         window.indexedDB = window.indexedDB || window.mozIndexedDB || 
         window.webkitIndexedDB || window.msIndexedDB;
         
         //prefixes of window.IDB objects
         window.IDBTransaction = window.IDBTransaction || 
         window.webkitIDBTransaction || window.msIDBTransaction;
         window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
         window.msIDBKeyRange
         
         if (!window.indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB.")
         }
         
         const employeeData = [
            {   id: "44546-5465-5654-65465" ,name: "Tjark"  },
            
         ];
         var db;
         var request = window.indexedDB.open("newDatabase", 1);
         
         request.onerror = function(event) {
            console.log("error: ");
         };
         
         request.onsuccess = function(event) {
            db = request.result;
            console.log("success: "+ db);
         };
         
         request.onupgradeneeded = function(event) {
            var db = event.target.result;
            var objectStore = db.createObjectStore("employee", {keyPath: "id"});
            
            for (var i in employeeData) {
               objectStore.add(employeeData[i]);
            }
         }

    setTimeout(stopScan, 5000);
    function stopScan() {
    //  log('Stopping scan...');
     // scan.stop();
    //  log('Stopped.  scan.active = ' + scan.active);
    }
 

    navigator.bluetooth.addEventListener('advertisementreceived', event => {
    //  if(event.device.name == 'Ohioh')
    //  {
      if ( event.device.name != null)
      {
        
        if(event.uuids == '0000180f-0000-1000-8000-00805f9b34fb')
        {
          Notification.requestPermission(result => {
  if (result === 'granted') {
    showNotification('So nice to have you here!', 'Hey there!')
  }
});

function showNotification(title, message) {
  if ('Notification' in window) {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification(title, {
        body: message,
        tag: 'vibration-sample'
      });
    });
  }
}
         var request = db.transaction(["employee"], "readwrite")
            .objectStore("employee")
            .add({ id:event.uuids , name: event.device.name});
            
            request.onsuccess = function(event) {
               alert(event.device.name +" has been added to your database.");
            };
            
            request.onerror = function(event) {
               alert("Unable to add data "+event.device.name +"  is aready exist in your database! ");
            }
          
         log('Advertisement received.');
      log('  Device Name: ' + event.device.name);
      log('  Device ID: ' + event.device.id);
      log('  RSSI: ' + event.rssi);
      log('  TX Power: ' + event.txPower);
      log('  UUIDs: ' + event.uuids);
           log('  Time: ' +  new Date(new Date().getTime() + 4*60*60*1000).toLocaleTimeString());
     
      }
      
      }
    //  }
     
    });

    
  } catch(error)  {
    log('Argh! ' + error);
  }
}

/* Utils */
 async function newscanner() {
  
var fruits = [];
  let options = {};
  options.acceptAllAdvertisements = true;
  
   try {
    log('Requesting Bluetooth Scan with options: ' + JSON.stringify(options));
    const scan = await navigator.bluetooth.requestLEScan(options);

    log('Scan started with:');
    log(' acceptAllAdvertisements: ' + scan.acceptAllAdvertisements);
    log(' active: ' + scan.active);
    log(' keepRepeatedDevices: ' + scan.keepRepeatedDevices);
    log(' filters: ' + JSON.stringify(scan.filters));

  
         //prefixes of implementation that we want to test
         window.indexedDB = window.indexedDB || window.mozIndexedDB || 
         window.webkitIndexedDB || window.msIndexedDB;
         
         //prefixes of window.IDB objects
         window.IDBTransaction = window.IDBTransaction || 
         window.webkitIDBTransaction || window.msIDBTransaction;
         window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
         window.msIDBKeyRange
         
         if (!window.indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB.")
         }
         
         const employeeData = [
            {   id: "44546-5465-5654-65465" ,name: "Tjark"  },
            
         ];
         var db;
         var request = window.indexedDB.open("newDatabase", 1);
         
         request.onerror = function(event) {
            console.log("error: ");
         };
         
         request.onsuccess = function(event) {
            db = request.result;
            console.log("success: "+ db);
         };
         
         request.onupgradeneeded = function(event) {
            var db = event.target.result;
            var objectStore = db.createObjectStore("employee", {keyPath: "id"});
            
            for (var i in employeeData) {
               objectStore.add(employeeData[i]);
            }
         }

     setTimeout(stopScan, document.getElementById("quantity").value *1000);
    function stopScan() {
     log('Stopping scan...');
      scan.stop();
      log('Stopped.  scan.active = ' + scan.active);
    }
 

     var devices = [];
    navigator.bluetooth.addEventListener('advertisementreceived', event => {
    //  if(event.device.name == 'Ohioh')
    //  {
         log('devices list  ' + devices);
      if ( event.device.name != null)
      {
        function checkAdult(device) {
            return device == event.uuids;
          }
          if(devices.find(checkAdult))
{

}
else{

devices.push(event.uuids);
    if(event.uuids == '0000180f-0000-1000-8000-00805f9b34fb')
        {
          Notification.requestPermission(result => {
  if (result === 'granted') {
    showNotification('So nice to have you here!', 'Hey there!')
  }
});

function showNotification(title, message) {
  if ('Notification' in window) {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification(title, {
        body: message,
        tag: 'vibration-sample'
      });
    });
  }
}
         var request = db.transaction(["employee"], "readwrite")
            .objectStore("employee")
            .add({ id:event.uuids , name: event.device.name});
            
            request.onsuccess = function(event) {
               alert(event.device.name +" has been added to your database.");
            };
            
            request.onerror = function(event) {
               alert("Unable to add data "+event.device.name +"  is aready exist in your database! ");
            }
         
          VALUE = JSON.stringify({
          
          "email": "Mitul@gmail.com",
      "uuid": event.uuids+" ",
"rssi": event.rssi+" ",
"devicename": event.device.name
          });
    console.log(VALUE);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch('https://ohioh.app:8442/api/users', {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: VALUE
    })
    .then(data => data.json())
    .then(data =>  { console.log(data)
                  // window.location.href = "https://gui--festive-ardinghelli-674e56.netlify.app/index.html";
                    alert("Congrats you are successfully logged in");
                   }) 
    .catch((err) => {
        console.error(err);
    })
          
         log('Advertisement received.');
      log('  Device Name: ' + event.device.name);
      log('  Device ID: ' + event.device.id);
      log('  RSSI: ' + event.rssi);
      log('  TX Power: ' + event.txPower);
      log('  UUIDs: ' + event.uuids);
           log('  Time: ' +  new Date(new Date().getTime() + 4*60*60*1000).toLocaleTimeString());
     
      }
}
        
      
      }
    //  }
     
    });
    
  } catch(error)  {
    log('Argh! ' + error);
  }
   
}
const logDataView = (labelOfDataSource, key, valueDataView) => {
  const hexString = [...new Uint8Array(valueDataView.buffer)].map(b => {
    return b.toString(16).padStart(2, '0');
  }).join(' ');
  const textDecoder = new TextDecoder('ascii');
  const asciiString = textDecoder.decode(valueDataView.buffer);
  log(`  ${labelOfDataSource} Data: ` + key +
      '\n    (Hex) ' + hexString +
      '\n    (ASCII) ' + asciiString);
};

    
  

  
  
  




  document.querySelector('form').addEventListener('submit', function(event) {
    event.stopPropagation();
    event.preventDefault();

    if (isWebBluetoothEnabled()) {
      ChromeSamples.clearLog();
      onButtonClick();
    }
  });

  log = ChromeSamples.log;

  function isWebBluetoothEnabled() {
    if (navigator.bluetooth) {
      return true;
    } else {
      ChromeSamples.setStatus('Web Bluetooth API is not available.\n' +
          'Please make sure the "Experimental Web Platform features" flag is enabled.');
      return false;
    }
  }

      /* jshint ignore:start */
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-53563471-1', 'auto');
      ga('send', 'pageview');
      /* jshint ignore:end */
    
