import express, { Request, Response } from 'express';
import 'dotenv/config';

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});

app.get('/', (req: Request, res: Response) => {
	res.send('Batata');
});
