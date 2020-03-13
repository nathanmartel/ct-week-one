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
      const _id = uuid();
      return writeJSON(`${this.name}/${_id}`, { _id, ...newObj });
    }
  }

  findById(_id) {
    return readJSON(`${this.name}/${_id}`);
  }

  find() {
    return readDirectoryJSON(this.name);
  }

  findByIdAndUpdate(_id, newObj) {
    const original = this.findById(_id);
    return updateJSON(`${this.name}/${_id}`, { ...original, newObj });
  }


};
