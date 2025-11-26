import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
	id: { type: Number, index: true },
	descricao: { type: String, index: true },
	preco: Number,
	estoque: Number,
});

export default mongoose.model('Produto', productSchema);
