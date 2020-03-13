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
};
