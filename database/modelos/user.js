const {model,Schema}= require('mongoose');

const user = new Schema({
    name: String,
    pass:String
  });
module.exports = model('user',user );