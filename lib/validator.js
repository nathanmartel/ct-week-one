const {
  isNumber,
  getCaster
} = require('./types.js');

module.exports = class Validator { 
  constructor(key, configuration) {
    this.key = key;
    this.configuration = configuration;
  }
  validate(obj) {
    if(!obj[this.key]) throw new Error ('The key (' + this.key + ') doesn\'t exist.');
    if(this.type === Number) {
      if(isNumber(this.type) === false) { 
        throw new Error ('The key (' + this.key + ') is not a number.');
      }
      // isString(this.type)
      // isBoolean(this.type)
    }
    const caster = getCaster(this.configuration.type);
    return caster(obj[this.key]);
  }
};
