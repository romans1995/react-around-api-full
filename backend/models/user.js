const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const reg = /[(http(s)?)://(www.)?a-zA-Z0-9@:%.+~#=]{2,256}.[a-z]{2,6}([-a-zA-Z0-9@:%+.~#?&//=]*)/i;

const userSchema = new mongoose.Schema({
  name: { // every user has a name field, the requirements for which are described below:
    type: String, // the name is a string
    minlength: 2, // the minimum length of the name is 2 characters
    maxlength: 30, // the maximum length is 30 characters
    required: false,
    default: 'Jacques Cousteau',
  },
  id: {
    type: String,
  },
  about: {
    type: String, // the pronouns are a string
    minlength: 2, // the minimum length of the name is 2 characters
    maxlength: 30, // the maximum length is 30 characters
    default: 'Explorer',
    required: false,
  },
  avatar: {
    type: String,
    default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fin.pinterest.com%2Fpin%2F536702480572227623%2F&psig=AOvVaw2BHDLID-Ns9rcpR_Wg2-uO&ust=1680543248832000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJCFic3di_4CFQAAAAAdAAAAABAE',
    validate: {
      validator: (v) => {
        reg.test(v);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
    required: false,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Valid email is required',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select("password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password user'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password password'));
          }

          return user; // now user is available
        });
    });
};

const User = mongoose.model('user', userSchema);
module.exports = User;
