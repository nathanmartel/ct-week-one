const {
  mkdirp,
  writeJSON,
  readJSON,
  readDirectoryJSON,
  updateJSON,
  deleteFile
} = require('../lib/file-system.js');

const myObj = {
  id: 1,
  name: 'Lenny'
};

const path = './example/data.json';

writeJSON(path, myObj);
