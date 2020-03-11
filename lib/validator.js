const { getCaster } = require('./types.js');

module.exports = class Validator { 
  constructor(key, configuration) {
    this.key = key;
    this.configuration = configuration;
  }
  validate(obj) {
    if(this.configuration.required && !obj[this.key]) throw new Error ('Missing required key >>' + this.key + '<<');
    if(!this.configuration.required && !obj[this.key]) return null;
    const caster = getCaster(this.configuration.type);
    return caster(obj[this.key]);
  }
};
