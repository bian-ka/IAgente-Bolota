import mongoose from 'mongoose';
import { importCSV } from './importCSV.js';

const filePath = 'src/data/dados_produtos.csv';

async function main() {
	await mongoose.connect(
		'mongodb://admin:bolota123@localhost:27017/bolota?authSource=admin'
	);
	console.log('Connected to MongoDB');
	await importCSV(filePath);
	await mongoose.disconnect();
	console.log('Disconnected from MongoDB');
}

main();
