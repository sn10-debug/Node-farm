// This is exporting as a expression

// module.exports = class {
//     constructor(name, age, gender, DOB) {
//       this.Name = name;
//       this.Age = age;
//       this.Gender = gender;
//       this.DOB = DOB;
//       this.skills = [];
//     }

//     get name() {
//       return this.Name;
//     }
//     get age() {
//       return this.Age;
//     }

//     set skill(sk) {
//       this.skills.push(sk);
//     }
//   };

class Info {
  constructor(name, age, gender, DOB) {
    this.Name = name;
    this.Age = age;
    this.Gender = gender;
    this.DOB = DOB;
    this.skills = [];
  }

  get name() {
    return this.Name;
  }
  get age() {
    return this.Age;
  }

  set skill(sk) {
    this.skills.push(sk);
  }
}

module.exports = Info;
