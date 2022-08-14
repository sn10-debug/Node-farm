const fs = require('fs');
console.log(arguments);
// This will only be displayed when we are inside a function and thus it will be proved that it goes into a wrapper function

console.log(require('module').wrapper);

// module.export

let Info = require('./modules/module-1-test');

let info1 = new Info('Shakti Santosh Nayak', 19, 'Male', '10-07-2003');
info1.skill = 'Programming';
info1.skill = 'Marketing';
info1.skill = 'Management';

console.log(info1);

// Exports

let funcs = require('./modules/module-2-test');

// This returns the exports object

console.log(funcs.findIndex([1, 2, 3, 4], 3));
console.log(funcs.Ispresent([1, 2, 3, 4], 5));

console.log(require('./modules/module-2-test').findIndex([100, 200, 300], 400));
console.log(require('./modules/module-2-test').Ispresent([100, 200, 300], 400));

// From here we should get the console.log be executed 3 times in the module-2-test as we have required them 3 times but due to caching in NodeJs, the code in the module is executed once only and it is extracted from the Node Processes whenever multiple requires are made for the same file
