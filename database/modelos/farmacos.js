const {model,Schema}= require('mongoose');

const farmacos = new Schema({
    name: String,
    pretentation:String,
    description:String,
    precioXU:String,
    precioXL:String,
    cantidaXL:String,
    fecha_I:Date,
    fecha_c:Date,
  });
module.exports = model('farmacos',farmacos );