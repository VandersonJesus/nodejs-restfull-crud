import express from 'express';
import "reflect-metadata";
import { AppDataSource } from './data-source';
import { routes } from './routes';

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(routes);
app.listen(PORT, () => { console.log(`Listening on port: ${PORT}`) });

AppDataSource.initialize().then(async () => {
}).catch(error => console.log(error));
