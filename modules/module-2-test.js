console.log('This are the set of Functions');

exports.findIndex = (arr, el) => {
  let index = undefined;
  for (let i = 0; i < arr.length; i++) {
    if (el === arr[i]) {
      index = i;
      break;
    }
  }

  return index;
};

exports.Ispresent = (arr, el) => {
  return arr.includes(el);
};
