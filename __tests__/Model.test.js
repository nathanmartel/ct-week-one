const Schema = require('../lib/Schema.js');
const Model = require('../lib/Model.js');
const fs = require('fs');

const dogSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  weight: {
    type: String
  }
});

const Dog = new Model('Dog', dogSchema);

// afterEach(() => {
//   fs.unlink('Dog/*');
// });

// Mock data
// jest.mock('fs', () => ({
//   promises: {
//     mkdir: jest.fn(() => Promise.resolve()),
//     readdir: jest.fn(() => Promise.resolve(['hooray1.json', 'hello.json'])),
//     readFile: jest.fn(() => Promise.resolve('{"id": "1","name":"Lenny"}')),
//     writeFile: jest.fn(() => Promise.resolve()),
//     unlink: jest.fn(() => Promise.resolve()),
//   }
// }));

describe('Model module', () => {

  it('Should create a file', () => {  
    return Dog.create({ name: 'Pickles', age: 7, weight: '25 lbs' })
      .then((result) => {
        // Not necessary to test calls since we handled it yesterday, but this does show what's happening under the hood.
        // expect(fs.mkdir)
        //   .toHaveBeenCalledWith('Dog', { recursive : true });
        // expect(fs.writeFile)
        //   .toHaveBeenCalledWith(`Dog/${result._id}`, JSON.stringify({ _id: result._id, name: 'Pickles', age: 7, weight: '25 lbs' }));
        expect(result)
          .toEqual({
            _id: expect.any(String), 
            name: 'Pickles', 
            age: 7, 
            weight: '25 lbs'
          });
      });
  });


  it('Should find a record by ID', () => {  
    let idToFind;
    Dog.create({ name: 'Pickles', age: 7, weight: '25 lbs' })
      .then((result) => {
        idToFind = result._id;
      });
    Dog.findById(idToFind)
      .then((result) => { 
        expect(result)
          .toEqual({
            _id: idToFind, 
            name: 'Pickles', 
            age: 7, 
            weight: '25 lbs'
          });
      });
  });

  it('Should find all dogs', () => {  
    Dog.create({ name: 'Pickles', age: 7, weight: '25 lbs' });
    Dog.create({ name: 'Fuzzy', age: 2, weight: '7 lbs' });
    Dog.find()
      .then((result) => { 
        expect(result)
          .toEqual([{
            _id: expect.any(String),
            name: 'Pickles', 
            age: 7, 
            weight: '25 lbs'
          }, {
            _id: expect.any(String),
            name: 'Pickles', 
            age: 7, 
            weight: '25 lbs'
          }]);
      });
  });

  it('Should find by ID and update', () => {  
    let idToFind;
    Dog.create({ name: 'Pickles', age: 7, weight: '25 lbs' })
      .then((result) => {
        idToFind = result._id;
      });
    Dog.findByIdAndUpdate(`${Dog.name}/${idToFind}`, { name: 'Franky' })
      .then((result) => { 
        expect(result)
          .toEqual({
            _id: idToFind, 
            name: 'Franky', 
            age: 7, 
            weight: '25 lbs'
          });
      });

  });

});
