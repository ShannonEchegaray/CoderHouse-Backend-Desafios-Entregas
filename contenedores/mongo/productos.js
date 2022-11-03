import mongoose, { Schema } from 'mongoose';

const producto = new Schema({
      id: {type: Number, required: true},
      nombre: { type: String, required: true },
      descripcion: { type: String, required: true },
      stock: { type: Number, required: true },
      precio: { type: Number, required: true },
      codigo: { type: String, required: true, index: true, unique: true },
      foto: { type: String, required: true },
      timestamp: { type: String, required: true },
});

export default mongoose.model('productos', producto);