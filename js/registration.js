 var url = 'http://195.201.35.222:3000/login?email=Mbadhon@gmail.com&password=badhon'
           function submitInfo(){
    
    let form = document.forms["myForm"];
    let fd = new FormData(form);
    let data = {};
    for (let [key, prop] of fd) {
      data[key] = prop;
    }
    VALUE = JSON.stringify(data, null, 2);
    console.log(VALUE);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch('https://195.201.35.222:3000/signup', {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: VALUE
    })
    .then(data => data.json())
    .then(data =>  { console.log(data) }) 
    .catch((err) => {
        console.error(err);
    })
}
