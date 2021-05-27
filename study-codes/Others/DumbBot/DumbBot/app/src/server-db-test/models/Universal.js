const mongoose = require('../database');

const UniversalSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  boolean: {
    type: Boolean,
    require: false,
  },
  boolean2: {
    type: Boolean,
    require: false,
  },
  text: {
    type: String,
    require: false,
  },
  text2: {
    type: String,
    require: false,
  },
  number: {
    type: Number,
    require: false,
  },
  number2: {
    type: Number,
    require: false,
  },
  lastActiveAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Universal = mongoose.model('Universal', UniversalSchema);

module.exports = Universal;
