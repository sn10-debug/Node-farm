const fs = require('fs');
const EventEmitter = require('events');
const server = require('http').createServer();

// let data = '';

// for (let i = 0; i < 10000; i++) {
//   data += `${i + 1} : Hello this is Shakti Santosh Nayak\n`;
// }

// fs.writeFileSync(`${__dirname}/txt/trial.txt`, data);

/////////////////////////

let event1 = new EventEmitter();

server.on('request', function (request, response) {
  // When there is a large file then we need to break it into chunks and then send it so that we don't take much memory and also not much

  let file = fs.createReadStream(`${__dirname}/txt/trial.txt`);

  let time1 = Date.now();
  //   file.on('data', async function (chunk) {
  // console.log(chunk);
  // response.write(chunk);
  // As we know that Http is a writable stream and thus it has two methods that is write and end
  //   });

  //   Reading file from the disk is fast but writing to the client is comparatively slow and thus this is known as Backpressure and to avoid this there is another solution given below

  //   file.on('end', () => {
  //     console.log(Date.now() - time1);
  //     response.end('Request Received');
  //   });

  //   This is to end the write stream

  //   file.on('error', function (err) {
  //     console.log(err);
  //     response.statusCode = 500;
  //     response.end('File not found');
  //   });

  //   There is another event which we can hear is error from Readable stream

  file.pipe(response);

  //   This method can be used while streaming and to avoid Backpressure

  //   response.end('Request Received');
});

server.on('request', function () {
  console.log('Request Received');
});

// event1.on('request', function () {
//   console.log('Request received at emitter');
// });

// This will not work as eventemitter which can emit and listen should be same in both case

server.listen(8000, '127.0.0.1', function () {
  console.log('Server Started');
});
