import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import fileUpload from 'express-fileupload';
import { checkToken } from './tokens/check.token';
import todoRoutes from './resources/todo/todo.router';
import loginRoutes from './resources/login/login.router';
import fileRoutes from './resources/file/file.router';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload({}));

app.use(checkToken);

app.use('', loginRoutes);
app.use('', todoRoutes);
app.use('', fileRoutes);
