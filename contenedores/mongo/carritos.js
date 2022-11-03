import mongoose, { Schema } from 'mongoose';

const carrito = new Schema({
      id: {type: Number, required: true},
      timestamp: { type: String, required: true },
      productos: { type: Array, required: true },
});

export default mongoose.model('carritos', carrito);