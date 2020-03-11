const isNumber = val => typeof val === 'number';

const isString = val => typeof val === 'string';

const isBoolean = val => typeof val === 'boolean';

const isArray = val => Array.isArray(val);

const isObject = val => { 
  if(val === null) return false;
  return (typeof val === 'object' || typeof val === 'function');
};

const isFunction = val => typeof val === 'function';

const castToNumber = val => {
  if(isNumber(val)) return val;
  if(val === null || val === undefined) throw new CastError(Number, val);
  const number = Number(val);
  if(isNaN(number)) throw new CastError(Number, val);
  return number;
};

const castToString = val => {
  if(isString(val)) return val;
  if(val === null) throw new CastError(String, val);
  if(val === undefined) return '';
  if(isObject(val) && typeof val === 'function') throw new CastError(String, val);
  if(isObject(val)) return JSON.stringify(val);
  return String(val);
};

const castToBoolean = val => {
  if(isBoolean(val)) return val;
  if(val === null || val === undefined) throw new CastError(Boolean, val);
  if(val === 0 || val === '0') return false;
  if(val === 1 || val === '1') return true;
  // All other conditions should not cast to Boolean
  throw new CastError(Boolean, val);
};


class CastError extends Error {
  constructor(Type, value) {
    const type = Type.name;
    super(`Cannot cast >>${value}<< to ${type}`);
    this.type = type;
    this.value = value;
  }
}

const casters = {
  Number: castToNumber,
  String: castToString,
  Boolean: castToBoolean,
};

const getCaster = Type => {  
  return casters[Type.name] || null;
};

module.exports = {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  CastError,
  getCaster,
  castToNumber,
  castToString,
  castToBoolean,
};
