var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const promise = new Promise((resolve, reject) => {
  const request = new XMLHttpRequest();

  request.open('GET', 'http://localhost:3001/random');
  request.onload = () => {
    if (request.status === 200) {
      resolve(request.responseText); // we got data here, so resolve the Promise
    } else {
      reject(Error(request.statusText)); // status is not 200 OK, so reject
    }
  };

  request.onerror = () => {
    reject(Error('Error fetching data.')); // error occurred, reject the  Promise
  };

  request.send(); // send the request
});

console.log('Asynchronous request made.');

promise.then((data) =>  {
  console.log(JSON.parse(data));
}, (error) => {
  console.log('Promise rejected.');
  console.log(error.message);
});