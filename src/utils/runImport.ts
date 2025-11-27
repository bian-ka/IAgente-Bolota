import mongoose from 'mongoose';
import { importCSV } from './importCSV.js';
import 'dotenv/config';

const filePath = 'src/data/dados_produtos.csv';

async function main() {
	const uri = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`;
	await mongoose.connect(uri);
	console.log('Connected to MongoDB');
	await importCSV(filePath);
	await mongoose.disconnect();
	console.log('Disconnected from MongoDB');
}

main();
