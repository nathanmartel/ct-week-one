const fs = require('fs').promises;

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
    // My mock that doesn't work
    // mkdir(path) {
    //   return Promise.resolve(`New folder made at ${path}`);
    // },
    // writeFile(path, obj) {
    //   return Promise.resolve(`New file containing ${obj} made at ${path}`);
    // },

    // Ryan's mock that works
    mkdir: jest.fn(() => Promise.resolve()),
    readdir: jest.fn(() => Promise.resolve(['hooray1.json', 'hello.json'])),
    readFile: jest.fn(() => Promise.resolve('{"id": "1","name":"Lenny"}')),
    writeFile: jest.fn(() => Promise.resolve()),
    unlink: jest.fn(() => Promise.resolve()),
  }
}));

describe('File System module', () => {

  it('Should make a directory and all parent directories', () => {

    // Mock test - Just see if the function was called correctly.
    const path = './newpath/here';
    return mkdirp(path)
      .then(() => {
        expect(fs.mkdir)
          .toHaveBeenCalledWith(path, { recursive : true });
      });

    // My test that doesn't work
    // expect(mkdirp(path)).toMatch(`New folder made at ${path}`);    

    // Actual test - See if new directory actually exists.
    // return mkdirp(path)
    //   .then(() => fs.stat(path))
    //   .then(stat => {
    //     expect(stat.isDirectory().toBeTruthy)
    //   }
    
  });

  it('Should write an object to a file', () => {
    const myObj = {
      id: 1,
      name: 'Lenny'
    };
    const path = './example/data.json';
    return writeJSON(path, myObj)
      .then(() => {
        expect(fs.writeFile)
          .toHaveBeenCalledWith(path, JSON.stringify(myObj));
        // expect(readJSON(path))
        //   .toEqual(myObj);
      });   
  });

  it('Should read an object from a file', () => {
    const path = './example/data.json';
    return readJSON(path)
      .then((result) => {
        expect(fs.readFile)
          .toHaveBeenCalledWith(path);
        expect(result)
          .toEqual({
            id: '1',
            name: 'Lenny'
          });
      });
  });

  it('Should read all files in a directory as objects', () => {
    return readDirectoryJSON('./fake')
      .then((result) => {
        expect(fs.readdir)
          .toHaveBeenCalledWith('./fake');
        expect(fs.readFile)
          .toHaveBeenCalledWith('./fake/hooray1.json');
        expect(fs.readFile)
          .toHaveBeenCalledWith('./fake/hello.json');
        expect(result)
          .toEqual([{
            id: '1', 
            name: 'Lenny' 
          },
          {
            id: '1', 
            name: 'Lenny' 
          }]);
      }); 
  });

  it('Should update a files JSON', () => {
    const path = './example/data.json';
    const newObj = { weight: '175 lbs' };
    return updateJSON(path, newObj)
      .then(result => {
        expect(fs.readFile)
          .toHaveBeenCalledWith(path);
        expect(fs.writeFile)
          .toHaveBeenCalledWith(path, '{"id":"1","name":"Lenny","weight":"175 lbs"}');
        expect(result)
          .toEqual({
            id: '1', 
            name: 'Lenny', 
            weight: '175 lbs' 
          });
      });     
  });

  it('Should delete a file', () => {
    const path = './example/data3.json';
    return deleteFile(path)
      .then(() => {
        expect(fs.unlink)
          .toHaveBeenCalledWith(path);
      });
  });

});
