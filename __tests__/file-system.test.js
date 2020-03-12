const {
  mkdirp,
  writeJSON,
  readJSON,
  readDirectoryJSON,
  updateJSON,
  deleteFile
} = require('../lib/file-system.js');

jest.mock('fs', () => {
  return {
    promises : {
      // My mock that doesn't work
      // mkdir(path) {
      //   return Promise.resolve(`New folder made at ${path}`);
      // },
      // writeFile(path, obj) {
      //   return Promise.resolve(`New file containing ${obj} made at ${path}`);
      // },

      // Ryan's mock that works
      mkdir: jest.fn(() => Promise.resolve()),
      readFile: jest.fn(() => Promise.resolve()),
    }
  };
});

// jest.beforeEach(() => {});

// jest.afterEach(() => {});

describe('File System module', () => {

  const path = './newpath/here';

  it('Should make a directory and all parent directories', () => {
    // My test that doesn't work
    // expect(mkdirp(path)).toMatch(`New folder made at ${path}`);
    
    // Mock test - Just see if the function was called correctly.
    const fs = require('fs').promises;
    return mkdirp(path)
      .then(() => {
        expect(fs.mkdir)
          .toHaveBeenCalledWith(path, { recursive : true });
      });

    // Actual test - See if new directory actually exists.
    // return mkdirp(path)
    //   .then(() => fs.stat(path))
    //   .then(stat => {
    //     expect(stat.isDirectory().toBeTruthy)
    //   }
    
  });

  it('Should write an object to a file', () => {
    // expect(mkdirp(path)).toMatch(`New folder made at ${path}`);
    
  });

  it('Should read an object from a file', () => {
    const fs = require('fs').promises;
    const path = 'data.json';
    return readJSON(path)
      .then(() => {
        expect(fs.readJSON)
          .toHaveBeenCalledWith(path);
      });
  });

  it('Should read all files in a directory as objects', () => {
  });

  it('Should update a files JSON', () => {
  });

  it('Should delete a file', () => {
  });

});
