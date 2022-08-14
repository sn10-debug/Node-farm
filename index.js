const fs = require('fs');

const slugify = require('slugify');
const datedisp = require('./modules/timedisp');

// Usually we require the in-built node-modules then the 3rd party modules and then the user-defined modules

// This require statement returns a object which has lot of methods which we can use to refer the file system in the local machine

// let file1=fs.readFileSync('txt/input.txt','utf-8')
// This function takes two arguements . first arguement is directory and second arguement is the encoding style.
// If we don't provide the encoding style then it returns a buffer which we don't need it
// This function runs synchronously and we know what synchronous means that is blocking type of code

// console.log(file1)

// let today=new Intl.DateTimeFormat('en-GB').format(new Date());
// let text=`This is what received from the input text file :\n ${file1} \n Date : ${today}`
// fs.writeFileSync('txt/output_file.txt',text)
// console.log('File written');

// Reading and Writing Files asynchronously

// let file2=fs.readFile('txt/input.txt','utf-8',(err,data)=>{
//     console.log(data)
//     fs.writeFile('txt/output.txt',data,(err)=>{

// Here no data is written so we don't need to take data as second arguement
// We know that arrow function gets it this keyword from the parent function

//         console.log('File written')
//     })

// })

// This will be a non blocking type of code

// new Promise(function(resolve,reject){
//     let text=fs.readFileSync('txt/input.txt','utf-8')
//     if(text) resolve(text)
//     else reject(new Error('File cannot be read'))
// }).then(data=>{
//     fs.writeFileSync('txt/output.txt',data)
//     console.log('File written')
// }).catch(err=>console.log(err))

// Same code writing with the help of promises

// Creating a Server

let name_1 = 'Shakti Santosh Nayak';
console.log(name_1);

let replaceTemp = (temp, product) => {
  let output = temp.replace(/{%RRODUCTIMAGE%}/g, product.image);
  output = output.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%PRODUCTQUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRODUCTPRICE%}/g, product.price);
  output = output.replace(/{%PRODUCTID%}/g, product.id);
  output = output.replace(/{%PRODUCT_DESC%}/g, product.description);
  output = output.replace(/{%PRODUCT_FROM%}/g, product.from);
  output = output.replace(/{%PRODUCTNUTRIENTS%}/g, product.nutrients);

  if (!product.organic) output = output.replace(/{%INORGANIC%}/g, 'not-organic');

  return output;
};

let http = require('http');
let url = require('url');
let prod_card_output = fs.readFileSync(`${__dirname}/templates/template-product_card.html`, 'utf-8');
let product_output = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
let overview_output = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
let product_data = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8'));

let server = http.createServer((request, response) => {
  let text = `<h1>Welcome </h1> 
    Hello your request is received by the server
    `;
  // In order to perform different actions on different urls , we should be able the get urls and this is one of the attribute of the request object

  // console.log(request.url)

  let { pathname, query } = url.parse(request.url, true);

  console.log(pathname);

  // This function runs two though we make one request because in the background two requests are made that is first our request and the default request made by the browser for the favicon

  if (pathname === '/' || pathname === '/overview') {
    let output = product_data.map((mov) => replaceTemp(prod_card_output, mov)).join('');
    console.log(output);
    response.end(overview_output.replace('{%PRODUCTCARDS%}', output));
  } else if (pathname === '/blog') response.end('Welcome to blog page');
  else if (pathname === '/contact') response.end('This is the contact Page\nYou can find the contact details below');
  else if (pathname === '/product') {
    let product = product_data[+query.id];

    console.log('Requested for product with id : ' + query.id);

    let output = replaceTemp(product_output, product);

    response.end(output);
  } else if (pathname === '/details') {
    let obj = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

    // This __dirname gives information about the directory in which the file is stored not the directory we are executing from
    // ./ represents the location from where we are executing the code but in case of require it is an exception, here it represents the location where the file is stored that is working directory

    let [obj1, ...others] = JSON.parse(obj);

    console.log(obj1.productName);

    response.end('JSON File printed in console');
  } else {
    // We can also write headers

    response.writeHead(404, {
      'Content-type': 'text/html',
      // Browser expecting html now
      Organization: 'Sigma',
      // We can also send our own parameters
    });

    response.end('<i>This page is currently not available</i>');
  }
});

server.on('close', function () {
  console.log('Server closed');
});

// This will listen the close event

server.listen(8000, '127.0.0.1', () => {
  console.log('Server Started');

  console.log(slugify('Server Started', { lower: true, replacement: '_' }));

  // Also space are replaced by hyphen

  // Each file for NodeJs is considered as a module
  // Function exported from another module

  console.log('Date : ', datedisp());
});

// Routing means different actions for different urls
// Simple dependencies where our code is dependent on other lines of code for the execution of the application

// npm install <package-name> --save
// We have to write this command in order to install the package in older versions but in latest versions we can ignore --save

// There is another kind of dependencies that is development dependencies and this dependencies are used for bundling the code,debugging the code and testing purposes

// Nodemon is a package which restarts the NodeJs application whenever we make changes to a node file in the working directory

// In order to directly run the command in the command line it should be a global dependency
// But in order to run the local dependency we have to declare it in scripts of the package.json and there we can define a key with a value of the same command we would have used if it would have be the global dependency

// we can write npm run start
// or also we can directly write npm start

// slugify is used for string conversions

// Usually versions of the packages in npm are represented by three numbers
// first number:major version , second number: minor version , third number: patch version
// third number is changed when there is fix in bugs in the package

// second number is changed when there are some new features introduced which does not introduce breaking changes that if our code has dependecy in the package then we don't have to change the code or any syntax

// first number is changed whenever there are breaking changes that is our code will not run if we don't make the changes released in the newer version

// ^ in front of version number represents that we only accept minor version updates and patch version updates

// When we write command 'npm outdated' then basically it returns a table which provides about which packages are outdated

// npm install slugify@1.0.0 to install specific version

// ~ in front of version number says that we only accept patch updates

// npm update slugify is a command to update any package

// * in front of version numbers says we accept all the versions which includes major release as well

// npm uninstall <package name> simply uninstalls the package and removes from the dependencies

// while deploying to github we should not deploy the node modules because it has lot of files and just with the help of package.json we can run the command npm install all the files will be downloaded

// with singleQuote to true all the double Quotes will be converted into single quote when we save the file

// Also it puts the semicolon at the end of each statement

// PUT and patch are the methods used to send data

// The difference between HTTP and HTTPS is that HTTPS is encrypted using TLS and SSL

// While rendering a website not only one request is made instead multiple requests are made for each file that is html file,css file , javascript file etc.

// always first request are made for html files

// In Case of API , only data is fetch from the database and in json format it is transeferred to the browser and here no building of website takes and here building of website takes place in client side and therefore it is callled client rendered. Website is build using framewroks like React and Angular

// In case of dynamic websites, both fetching data and building websites with the help of templates and data on the server side and then it is transferred to the browser and the website is rendered

// In case of static websites, the files of the website is just sent and no changes are made in the website it remains same at every time and the website is rendered on the browser after all the files are received

// For NodeJs to work it is dependent on some libraries which are V8 engine,Libuv

// V8 engine developed by Google helps NodeJs to understand javascript

// Libuv support asynchronous I/O and gives Node access to underlying operating system, file system , netwroking and so on

// Also it got its Event loop and Thread pool from Libuv

// Event loops are used for callbacks and Thread pool are used for file streams

// Libuv is written in C++ and V8 engine in C++ and javascript

// It also uses Http-parser for parsing the Http stuffs

// It also uses c-acres for the DNS stuffs

// It also uses OpenSSL for cryptography

// It also uses zlib for file compression

// Whenever we use NodeJs we are running a process which is an instance of program written in C++ and we also have to the global variable
// process;

// NodeJs works on single thread system and therefore it is able to block application

// Thread is a sequence of instructions which occurs in computer microprocessor

// In the Thread following stepwise process takes place :

// 1. Program initialization
// 2. Execute top-level code
// 3. Require modules
// 4. Register event callbacks
// 5. Start event loop

// To prevent blocking code ,we have thread pools

// We developers don't decide about which processes will go into the thread pool instead NodeJs itself transfers heavy and expensive tasks which might block the code to the thread pool
// There are 4 threads which are usually used but there can be more threads as well

// This tasks may include :

// 1. Cryptography
// 2. File system
// 3. DNS lookup
// 4. Compression

// All the application code inside a callback function gets executed by the event loop
// Top level code are executed by the event loop

// NodeJs is build around callbacks

// Event driven architecture

// 1. Event occurs
// 2. Event loop picks them up
// 3. Callbacks are called

// Event loop does orchestration

// Which simply means that it acknowledges the events and calls the callback associated with the events and passes the heavy tasks to other thread pool

// Event loop has 4 phases and each phase has its own callback queue and 2 other phases as well

// The event loop does not proceeds to another phase till callback queue of the current phase which the event loop is executing becomes empty

// Phases:
// 1. expired timer callbacks
// 2. I/O polling and callbacks
// 3. setImmediate callbacks
// 4. close callbacks
// 5. Process.nexttick() queue
// 6. Other Microtask queue(like consuming promises)

// Always the phase with expired timer callbacks are executed first

// setImmediate callbacks are the special timers whose callback needs to be immediately executed after the I/O polling and callbacks phase

// close callbacks consists of the callbacks which are called when we close a server and something like that

// This is one tick that is one cycle and program only exists as when there is no callbacks waiting in different callback queues pf different phases

// When we run a server it is a I/O process and thus the cycle keeps on running and thus program only exists when we close the server

// From any phase if there is callback in Process.nexttick or microtask queue then it will immediately go to that queue

// The callback attached with server execution belongs to I/O

// Streams are used to read data piece by piece like in chunks without reading the file all at once and keeping the whole file in memory

// This is the mechanism is used by Youtube and Netflix that is the whole file is not downloaded at once but the file reaches to us chunk by chunk so that we don't have to wait for the whole file to be downloaded

// This is perfect for handling large amounts of data

// There are 4 types of streams:

// 1. Readable streams
// 2. Writable streams
// 3. Duplex streams
// 4. Transform streams

// Readable streams:

// We consume data using this streams
// There are two main events involved with this stream is that read and end
// This stream emits read event when the data is getting read chunk by chunk that is when data is consumed
// This stream emits end event when there is no data left to consume

// There are two main functions involved with this stream that is pipe() and read()

// Example : http requests , fs read

// Writable streams:

// We write data using this stream
// The two important events involved with this is stream is drain and finish
// The important functions involved with this streams are read() and end()
// Examples : http responses and fs write

// Duplex streams:

// This are the streams which are used to write and read data
// Examples : net web socket

// Transform streams

// Duplex streams which can transform the data which can be read or written
// Examples :zlib gzib creation
// Like this streams are used while compression

// The Readable streams and writable streams are known as consume streams because they are consumed with the help of events and the functions attached with them and all the above streams are implemented by NodeJs

// COMMONJS MODULE SYSTEM

// Each javascript file is treated as a separate module
// In NodeJs commonjs module system is used using require,module.exports or exports
// ES module system is used to import and export in the browser that is in the front end that is in the client side

// There have been to bring ES modules to NodeJs using file extension(.mjs)

// Require function

// When we write the path for the user defined module in the require function and we dont write .js extension while requiring and thus if no file exists such like that then it will consider it as a folder and find a index.js named file in that folder and if that also is not found then it will throw an error

// require function starts with core modules and tries to resolve the path for them and then load them

// if the module does not belong to core modules neither user defined modules and if it is also not installed from npm then it will throw an error or an exception

// Then the modules are  loaded

// Now after this wrapping of the module takes place that is the code of the module is put into a function where require , __dirname and some other parameters like exports,module,__filename are passed and thus we have access to require functions

// __filename provides the exact path of the module

// Also through these NodeJs ensures that wrapping happens of each module independent of other modules so that the variables declared in this module remain private and does not clash with the variable in the other modules having same name

// Then execution of code inside the required modules take place that is the wrapper functions are executed

// the exports are then returned from the required function and we store it in a variable

// We use module.exports when we want to export any one class or function

// we use exports to transfer more than one thing with the help of named variables

// and finally the data is cached that is after subsequent calls the data is cached and we don't need to execute the code of the modules again and again

// Express :

// Express is a NodeJs minimal framework which is behind the scenes written using NodeJs code
// This has lot of features with it like complex routing,server-side rendering,easier handling of requests and responses, middleware etc.
// This also helps to stick to MVC architecture
// Express helps to rapid development of NodeJs applications
