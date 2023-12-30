const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: 'Required'
  },
  dp: {
    type: String,
    default: ''
  },
  bg: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: 'Required'
  },
  email: {
    type: String,
    required: 'Required'
  },
  password: {
    type: String,
    required: 'Required'
  },
  jobTitle: {
    type: String
  },
  sector: {
    type: String
  },
  location: {
    type: Array
  },
  town: {
    type: String
  },
  profileDesc: {
    type: String
  },
  contact: {
    type: String
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: {
    type: Array
  },
  completed: {
    type: Boolean,
    default: false
  },
  varified: {
    type: Boolean,
    default: false
  },
  jobExperienceInfo: {
    type: Array,
    default: []
  },
  educationInfo: {
    type: Array,
    default: []
  }
})

const UserModel = mongoose.model('user', UserSchema)

module.exports = {
  UserModel
}
