const fs = require('fs').promises;

const mkdirp = (path) => {
  return fs.mkdir(path, { recursive : true });
};

const writeJSON = (path, obj) => {
  return fs.writeFile(path, JSON.stringify(obj))
    .then(() => obj);
};
  
const readJSON = (path) => { 
  return fs.readFile(path)
    .then(contents => JSON.parse(contents));
};

const readDirectoryJSON = (path) => {
  return fs.readdir(path)
    .then(files => {
      const readAllFiles = files.map(file => {
        return readJSON(`${path}/${file}`);
      });
      return Promise.all(readAllFiles);
    });
};

const updateJSON = (path, obj) => {
  return readJSON(path)
    .then(json => {
      const updatedJSON = { ...json, ...obj };
      return writeJSON(path, updatedJSON);
    });
};

const deleteFile = (path) => {
  fs.unlink(path);
};

module.exports = {
  mkdirp,
  writeJSON,
  readJSON,
  readDirectoryJSON,
  updateJSON,
  deleteFile
};
