const Validator = require('../lib/Validator.js');


describe('validator module', () => {
  describe('nameValidator validation', () => {

    const nameValidator = new Validator('name', { type: String, required: true });

    const dog = {
      name: 'spot',
      age: '5',
      weight: '20 lbs'
    };

    const god = {
      name: 'tops',
      age: '95',
      weight: '02 lbs'
    };


    it('properly returns or throws', () => {
      expect(nameValidator.validate(dog)).toMatch('spot');
      expect(nameValidator.validate(god)).toMatch('tops');
    });

    // it('throws if value is not castable to a number', () => {
    //   expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
    // });
    
  });
});


