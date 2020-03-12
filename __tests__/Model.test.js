const fs = require('fs').promises;
const uuid = require('uuid/v4');
const randomId = uuid();

const {
  create,
  findById,
  find,
  findByIdAndUpdate,
  findByIdAndDelete
} = require('../lib/Model.js');

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

  it('Should make a directory and all parent directories', () => {

    // Mock test - Just see if the function was called correctly.
    const path = './newpath/here';
    return mkdirp(path)
      .then(() => {
        expect(fs.mkdir)
          .toHaveBeenCalledWith(path, { recursive : true });
      });
  });

});
