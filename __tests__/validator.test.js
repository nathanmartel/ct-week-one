const Validator = require('../lib/Validator.js');


describe('validator module', () => {
  describe('nameValidator validation', () => {

    const nameValidator = new Validator('name', { type: String, required: true });
    const ageValidator = new Validator('age', { type: Number, required: true });
    const weightValidator = new Validator('weight', { type: String, required: false });

    it('1. Throws an error on a required key that is missing', () => {
      const dog = {
        age: 5,
        weight: '20 lbs'
      };
      expect(() => nameValidator.validate(dog)).toThrowError('Missing required key >>name<<');
    });    

    it('2a. Validates a required key of wrong type that is castable', () => {
      const dog = {
        name: 55555,
        age: '5',
        weight: '20 lbs'
      };  
      expect(nameValidator.validate(dog)).toMatch('55555');
      expect(ageValidator.validate(dog)).toEqual(5);
    });

    it('2b. Throws an error on a required key of wrong type that is not castable', () => {
      const dog = {
        name: () => {},
        age: 5,
        weight: '20 lbs'
      };
      expect(() => nameValidator.validate(dog)).toThrowError('Cannot cast >>() => {}<< to String');
    });    

    it('3. Validates a required key of right type', () => {
      const dog = {
        name: 'spot',
        age: 5,
        weight: '20 lbs'
      };  
      expect(nameValidator.validate(dog)).toMatch('spot');
      expect(ageValidator.validate(dog)).toEqual(5);
    });

    it('4. Validates a non-required key that is missing', () => {
      const dog = {
        name: 'spot',
        age: 5,
      };
      expect(weightValidator.validate(dog)).toEqual(null);
    });    

    it('5a. Validates a non-required key of wrong type that is castable', () => {
      const dog = {
        name: 'spot',
        age: 5,
        weight: 20
      };
      expect(weightValidator.validate(dog)).toMatch('2');
    });    

    it('5b. Throws an error on a non-required key of wrong type that is not castable', () => {
      const dog = {
        name: 'spot',
        age: 5,
        weight: () => {}
      };
      expect(() => weightValidator.validate(dog)).toThrowError('Cannot cast >>() => {}<< to String');
    });    

    it('6. Validates a non-required key of right type', () => {
      const dog = {
        name: 'spot',
        age: 5,
        weight: '20 lbs'
      };
      expect(weightValidator.validate(dog)).toMatch('20 lbs');
    });    


  });
});


