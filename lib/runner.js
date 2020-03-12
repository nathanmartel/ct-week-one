const {
  mkdirp,
  writeJSON,
  readJSON,
  readDirectoryJSON,
  updateJSON,
  deleteFile
} = require('../lib/file-system.js');

console.log(mkdirp('./mkdir2/test'));
