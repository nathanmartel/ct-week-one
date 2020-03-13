const Schema = require('./Schema.js');
const uuid = require('uuid/v4');

const {
  mkdirp,
  writeJSON,
  readJSON,
  readDirectoryJSON,
  updateJSON,
  deleteFile
} = require('./file-system.js');

module.exports = class Model {
  constructor(name, schema) {
    this.name = name;
    this.schema = schema;
    mkdirp(this.name);
  }

  create(obj) {
    const newObj = this.schema.validate(obj);
    if(newObj) {
      const id = uuid();
      return writeJSON(`${this.name}/${id}`, { id, ...newObj });
    }
  }

  findById(id) {
    return readJSON(`${this.name}/${id}`);
  }

  find() {
    return readDirectoryJSON(this.name);
  }

  findByIdAndUpdate(id, newObj) {
    const original = this.findById(id);
    return updateJSON(`${this.name}/${id}`, { ...original, newObj });
  }


};
