const Schema = require('./Schema.js');
const uuid = require('uuid/v4');
const randomId = uuid();

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
    this.schema = new Schema(schema);
    mkdirp(this.name);

  }

  create(obj) {
    if(obj.validate) { 

      writeJSON(this.name, obj); }
  }
};





























const dogSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  weight: {
    type: String
  }
});

const Dog = new Model('Dog', dogSchema);

// create(obj) {
//   // check schema
//   const validated = this.schema.validate(obj);
//   return writeJSON(`./${this.modelName}`, validated)
// }

Dog
  .create({ name: 'spot', age: 5, weight: '20 lbs' })
  .then(createdDog => {
    // do stuff with a created dog
  });

Dog
  .find()
  .then(allDogs => {
    // do stuff with all dogs
  });

Dog
  .findById(dogId)
  .then(dog => {
    // do stuff with a dog
  });

Dog
  .findByIdAndUpdate(dogId, { name: 'rover' })
  .then(updatedDog => {
    // do stuff with the updated dog
  });

Dog
  .findByIdAndDelete(dogI)
  .then(deletedDog => {
    // do stuff with the deleted dog
  });