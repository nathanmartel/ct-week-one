const {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  castToNumber,
  castToString,
  castToBoolean,
  getCaster
} = require('../lib/types.js');

// isNumber
describe('validator module', () => {
  describe('basic validation', () => {
    it('properly tells if a value is a number', () => {
      expect(isNumber(3)).toBeTruthy();
      expect(isNumber('hi')).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
      expect(isNumber([1, 2])).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber({ foo: 'bar' })).toBeFalsy();
      expect(isNumber(() => {})).toBeFalsy();
      expect(isNumber(true)).toBeFalsy();
      expect(isNumber(undefined)).toBeFalsy();
      expect(isNumber(null)).toBeFalsy();
    });
  });

  // isString
  describe('basic validation', () => {
    it('properly tells if a value is a string', () => {
      expect(isString(3)).toBeFalsy();
      expect(isString('hi')).toBeTruthy();
      expect(isString('')).toBeTruthy();
      expect(isString([1, 2])).toBeFalsy();
      expect(isString([])).toBeFalsy();
      expect(isString({ foo: 'bar' })).toBeFalsy();
      expect(isString({})).toBeFalsy();
      expect(isString(() => {})).toBeFalsy();
      expect(isString(true)).toBeFalsy();
      expect(isString(undefined)).toBeFalsy();
      expect(isString(null)).toBeFalsy();
    });
  });

  // isBoolean
  describe('basic validation', () => {
    it('properly tells if a value is a boolean', () => {
      expect(isBoolean(3)).toBeFalsy();
      expect(isBoolean(1)).toBeFalsy();
      expect(isBoolean(0)).toBeFalsy();
      expect(isBoolean('hi')).toBeFalsy();
      expect(isBoolean('')).toBeFalsy();
      expect(isBoolean([1, 2])).toBeFalsy();
      expect(isBoolean([])).toBeFalsy();
      expect(isBoolean({ foo: 'bar' })).toBeFalsy();
      expect(isBoolean({})).toBeFalsy();
      expect(isBoolean(() => {})).toBeFalsy();
      expect(isBoolean(true)).toBeTruthy();
      expect(isBoolean(undefined)).toBeFalsy();
      expect(isBoolean(null)).toBeFalsy();
    });
  });

  // isArray
  describe('basic validation', () => {
    it('properly tells if a value is an array', () => {
      expect(isArray(3)).toBeFalsy();
      expect(isArray('hi')).toBeFalsy();
      expect(isArray('')).toBeFalsy();
      expect(isArray([1, 2])).toBeTruthy();
      expect(isArray([])).toBeTruthy();
      expect(isArray({ foo: 'bar' })).toBeFalsy();
      expect(isArray({})).toBeFalsy();
      expect(isArray(() => {})).toBeFalsy();
      expect(isArray(true)).toBeFalsy();
      expect(isArray(undefined)).toBeFalsy();
      expect(isArray(null)).toBeFalsy();
    });
  });

  // isObject
  describe('basic validation', () => {
    it('properly tells if a value is an object', () => {
      expect(isObject(3)).toBeFalsy();
      expect(isObject('hi')).toBeFalsy();
      expect(isObject('')).toBeFalsy();
      // Arrays are not primitives, therefore they are objects
      expect(isObject([1, 2])).toBeTruthy();
      expect(isObject([])).toBeTruthy();
      expect(isObject({ foo: 'bar' })).toBeTruthy();
      expect(isObject({})).toBeTruthy();
      // Functions are objects
      expect(isObject(() => {})).toBeTruthy();
      expect(isObject(true)).toBeFalsy();
      expect(isObject(undefined)).toBeFalsy();
      expect(isObject(null)).toBeFalsy();
    });
  });

  // isFunction
  describe('basic validation', () => {
    it('properly tells if a value is an object', () => {
      expect(isFunction(3)).toBeFalsy();
      expect(isFunction('hi')).toBeFalsy();
      expect(isFunction('')).toBeFalsy();
      expect(isFunction([1, 2])).toBeFalsy();
      expect(isFunction([])).toBeFalsy();
      expect(isFunction({ foo: 'bar' })).toBeFalsy();
      expect(isFunction({})).toBeFalsy();
      expect(isFunction(() => {})).toBeTruthy();
      expect(isFunction(true)).toBeFalsy();
      expect(isFunction(undefined)).toBeFalsy();
      expect(isFunction(null)).toBeFalsy();
    });
  });


  describe('casters', () => {
    // castToNumber
    it('can cast values to a number', () => {
      expect(castToNumber(3)).toEqual(3);
      expect(castToNumber('3')).toEqual(3);
      expect(castToNumber(true)).toEqual(1);
      expect(castToNumber(false)).toEqual(0);
    });

    it('throws if value is not castable to a number', () => {
      expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber('3 2')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber(() => {})).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber(undefined)).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber(null)).toThrowErrorMatchingSnapshot();
    });

    // castToString
    it('can cast values to a string', () => {
      expect(castToString(3)).toMatch('3');
      expect(castToString('3')).toMatch('3');
      expect(castToString([1, 2])).toMatch('[1,2]');
      expect(castToString([])).toMatch('[]');
      expect(castToString({ foo: 'bar' })).toMatch('{"foo":"bar"}');
      expect(castToString({})).toMatch('');
      expect(castToString(true)).toMatch('true');
      expect(castToString(false)).toMatch('false');
      expect(castToString(undefined)).toMatch('');
    });

    it('throws if value is not castable to a string', () => {
      expect(() => castToString(null)).toThrowErrorMatchingSnapshot();
      expect(() => castToString(() => {})).toThrowErrorMatchingSnapshot();
    });

    // castToBoolean
    it('can cast values to a string', () => {
      expect(castToBoolean(0)).toEqual(false);
      expect(castToBoolean('0')).toEqual(false);
      expect(castToBoolean('1')).toEqual(true);
      expect(castToBoolean(1)).toEqual(true);
      expect(castToBoolean(true)).toEqual(true);
      expect(castToBoolean(false)).toEqual(false);
    });

    it('throws if value is not castable to a boolean', () => {
      expect(() => castToBoolean('3')).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean('3 2')).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean([1, 2])).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean([])).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean({ foo: 'bar' })).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean({})).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean(() => {})).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean(undefined)).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean(null)).toThrowErrorMatchingSnapshot();
    });

  });

  it('can get the right caster', () => {
    expect(getCaster(Number)).toEqual(castToNumber);
    expect(getCaster(String)).toEqual(castToString);
    expect(getCaster(Boolean)).toEqual(castToBoolean);
    expect(getCaster(Promise)).toBeNull();
  });
});
