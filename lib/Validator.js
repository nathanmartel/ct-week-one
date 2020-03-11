const { getCaster } = require('./types.js');

module.exports = class Validator { 
  constructor(field, configuration) {
    this.field = field;
    this.configuration = configuration;
  }
  validate(obj) {
    if(this.configuration.required && !obj[this.field]) throw new Error ('Missing required field >>' + this.field + '<<');
    if(!this.configuration.required && !obj[this.field]) return null;
    const caster = getCaster(this.configuration.type);
    return caster(obj[this.field]);
  }
};
