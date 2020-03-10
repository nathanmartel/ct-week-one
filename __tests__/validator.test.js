const {
  Validator,
} = require('../lib/validator.js');

const nameValidator = new Validator('name', String, true);

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


describe('validator module', () => {
  describe('nameValidator validation', () => {
    it('properly returns or throws', () => {
      expect(nameValidator.validate(dog)).toMatch('spot');
      expect(nameValidator.validate(god)).toMatch('tops');
      expect(nameValidator.validate(god)).toMatch('tops');
    });

    // it('throws if value is not castable to a number', () => {
    //   expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
    // });
    
  });
});


