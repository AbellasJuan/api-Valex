import cors from 'cors';
import dotenv from 'dotenv';
import express, {json} from 'express';
import 'express-async-errors';
import employeeRouter from '../src/routers/employeeRouter.js';
import { handleErrorMiddleware } from './middlewares/handleErrorMiddleware.js';
dotenv.config()

const app = express();

app.use(json());
app.use(cors());
app.use(employeeRouter);
app.use(handleErrorMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, ()=> {
    console.log(`Running on port ${port}`)
})