const {
  isNumber
} = require('./types.js');

module.exports = class Validator { 
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
};



// ageValidator.validate(dog); // returns 5
// colorValidator.validate(dog); // throws error
