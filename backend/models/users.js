const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(e) {
        return /https?:\/\/(www.)?[\w\\-_~:/?#@!$&'*,;=]+\.\w+/.test(e);
      },
      message: 'Введен некорректный URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(e) {
        return isEmail(e);
      },
      message: 'Введен некорректный Email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.set('toJSON', {
  transform(doc, ret) {
    const user = ret;
    delete user.password;
    return user;
  },
});

module.exports = mongoose.model('user', userSchema);
