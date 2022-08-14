let http = require('http');

const fs = require('fs');
const crypto = require('crypto');
const { response } = require('express');
let EventEmitter = require('events');

let start = Date.now();

process.env.UV_THREADPOOL_SIZE = 1;

// This will increase the Number of threads to 5

setTimeout(() => {
  console.log('Set timeout callback executed');
}, 0);

// let data = fs.readFileSync('output.txt', 'utf-8');

// console.log(data);

fs.readFile('txt/output.txt', 'utf-8', function (err, data) {
  console.log(data);

  setTimeout(() => {
    console.log('Timer 2 called');
  }, 0);

  setImmediate(() => {
    console.log('Timer 3 called');
  });
  Promise.resolve('Hello World from resolved Promise').then((data) => console.log(data));

  process.nextTick(() => console.log('Hello world from Process nextTick'));

  //   This will be executed before the timer as we know the order of exceution of the event loop
  // After the I/O polling it comes to setImmediate callbacks and then to setTimeout callbacks

  // It will wait till all the code in the I/O callback executed and then it will go to the next Phase

  // We know that Process nextTick comes before the Resolved promises and thus that will be executed first and then the resolved promises

  for (let i = 0; i < 2; i++) {
    crypto.pbkdf2('Hello world', 'salt', 10000, 1024, 'sha512', () => {
      console.log('Time for encrypting : ', (Date.now() - start) / 1000, ' seconds');
    });
    crypto.pbkdf2('Hello world', 'salt', 10000, 1024, 'sha512', () => {
      console.log('Time for encrypting : ', (Date.now() - start) / 1000, ' seconds');
    });
    crypto.pbkdf2('Hello world', 'salt', 10000, 1024, 'sha512', () => {
      console.log('Time for encrypting : ', (Date.now() - start) / 1000, ' seconds');
    });
    crypto.pbkdf2('Hello world', 'salt', 10000, 1024, 'sha512', () => {
      console.log('Time for encrypting : ', (Date.now() - start) / 1000, ' seconds');
    });

    // This 4 will take same time because there are 4 thread pools and thus they will be individually transferred to each of the thread pool

    // (If we don't set the number of threads manually 👆)

    crypto.pbkdf2('Hello world', 'salt', 10000, 1024, 'sha512', () => {
      console.log('Time for encrypting : ', (Date.now() - start) / 1000, ' seconds');
    });
    // This will take some time because it has to wait for other encryptions to finish
  }

  // Making a Asynchronous Encryption

  crypto.pbkdf2Sync('Hello World', 'salt', 1000, 1024, 'sha512');
  console.log('Successfly encrypted synchronously : ', (Date.now() - start) / 1000, ' seconds');
});

setImmediate(() => {
  console.log('Immediate timer callback executed');
});

console.log('Hello world');

// Http, I/O related stuffs are build build around event driven architecture and we can also program with the event driven architecture

// The Event architecture is as follows:

// 1. There are event emitters which emit the event like for example when something hits the server there are event emitter which emit the event
// 2. There are event listeners which listen to these events and put the attached callback into execution

// let server = http.createServer();

// server.on('request', (request, response) => {
//   response.end('Request Received Successfully');
// });

// Here server is a emitter and 'request' is a event which is emitted by the emitter and the server.on() is a listener and calls the callback attached with it

// The combination of both event emitter and event listener is together called as Observer pattern

// Here server is an instance of EventEmitter class and thus this follows this architecture of emitting and listening

let emitter = new EventEmitter();

emitter.on('newTransaction', function () {
  console.log('There is a new Transaction\n');
});

// We can add multiple listeners for the same event

emitter.on('newTransaction', (networkName) => {
  console.log(`Transaction transferred to ${networkName} Network\n`);
});

emitter.emit('newTransaction', 'Solana');
// Basically it is like clicking a button and listening to the click event
// We can also pass arguements to the emitters

emitter.emit('newTransaction', 'Ethereum');

class Student extends EventEmitter {
  constructor() {
    super();
    this.results = {};
    this.on('addMarks', (subject, marks) => {
      let existing_subjects = Object.keys(this.results);
      if (!existing_subjects.some((mov) => mov == subject)) this.results[subject] = marks;
      else console.log(`Already Marks Entered for ${subject}\n`);
    });
  }
}

let student1 = new Student();

student1.emit('addMarks', 'Maths', 100);
student1.emit('addMarks', 'Physics', 100);
student1.emit('addMarks', 'Maths', 100);

let student2 = new Student();

student2.emit('addMarks', 'Physics', 100);
student2.emit('addMarks', 'Chemistry', 100);

console.log(student1.results, student2.results);
