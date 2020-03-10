const {
  isNumber
} = require('.types.js');

class Validator { 
  constructor(key, type, required) {
    this.key = key;
    this.type = type.name;
    this.required = required;
    this.validate = (obj) => {
      if(!obj[key]) throw new Error ('The key (' + key + ') doesn\'t exist.');
      if(this.type === Number) {
        if(isNumber(this.type) === false) { 
          throw new Error ('The key (' + key + ') is not a number.');
        }
        // isString(this.type)
        // isBoolean(this.type)
      }
      return obj[key] || Error;
    };
  }
}

const nameValidator = new Validator('name', String, true);

// const ageValidator = new Validator('age', {
//   type: Number,
//   required: true
// });

// const colorValidator = new Validator('color', {
//   type: String,
//   required: true
// });

const dog = {
  name: 'spot',
  age: '5',
  weight: '20 lbs'
};

const god = {
  namey: 'tops',
  age: '95',
  weight: '02 lbs'
};

console.log(nameValidator.validate(dog)); // returns 'spot'
console.log(nameValidator.validate(god)); // returns 'spot'
// ageValidator.validate(dog); // returns 5
// colorValidator.validate(dog); // throws error