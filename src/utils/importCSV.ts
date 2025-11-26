import fs from 'fs';
import csv from 'csv-parser';
import product from '../models/product.js';

function validateProduct(product: any) {
	if (!product.id || isNaN(Number(product.id))) return false;
	if (!product.descricao || typeof product.descricao !== 'string') return false;
	if (!product.preco || isNaN(Number(product.preco))) return false;
	if (!product.estoque || isNaN(Number(product.estoque))) return false;
	return true;
}

export async function importCSV(filePath: string) {
	return new Promise<void>((resolve) => {
		const products: any[] = [];
		fs
			.createReadStream(filePath)
			.pipe(csv())
			.on('data', (row) => {
				if (validateProduct(row)) {
					products.push(row);
				} else {
					console.warn(`Invalid product: ${row.id}`);
				}
			})
			.on('end', async () => {
				try {
					let importedCount = 0;
					for (const prod of products) {
						const exists = await product.findOne({ id: prod.id });
						if (!exists) {
							await product.create(prod);
							importedCount++;
						} else {
							console.log(`The product already exists: ${prod.id}`);
						}
					}
					if (importedCount > 0) {
						console.log('Import completed');
					}
				} catch (error) {
					console.error('Error inserting products:', error);
				}
				resolve();
			});
	});
}
