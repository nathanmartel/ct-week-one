const fs = require('fs').promises;

const mkdirp = (path) => {
  return fs.mkdir(path, { recursive : true });
};

const writeJSON = (path, obj) => {
  return fs.writeFile(path, JSON.stringify(obj));
};
  
const readJSON = (path) => { 
  return fs.readFile(path)
    .then(contents => JSON.parse(contents));
};

const readDirectoryJSON = (path) => {
  return fs.readdir(path)
    .then(files => {
      const readAllFiles = files.map(file => {
        return fs.readFile(`.data/${file}`, { encoding: 'utf8' });
      });
      return Promise.all(readAllFiles);
    })
    .then(fileContent => console.log(fileContent));
};

const updateJSON = (file, obj) => {};

const deleteFile = (file) => {};

module.exports = {
  mkdirp,
  writeJSON,
  readJSON,
  readDirectoryJSON,
  updateJSON,
  deleteFile
};
