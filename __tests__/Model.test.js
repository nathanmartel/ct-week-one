const fs = require('fs').promises;
const Schema = require('../lib/Schema.js');
const Model = require('../lib/Model.js');

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

const {
  mkdirp,
  writeJSON,
  readJSON,
  readDirectoryJSON,
  updateJSON,
  deleteFile
} = require('../lib/file-system.js');

jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(() => Promise.resolve()),
    readdir: jest.fn(() => Promise.resolve(['hooray1.json', 'hello.json'])),
    readFile: jest.fn(() => Promise.resolve('{"id": "1","name":"Lenny"}')),
    writeFile: jest.fn(() => Promise.resolve()),
    unlink: jest.fn(() => Promise.resolve()),
  }
}));

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

});
