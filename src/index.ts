import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import routes from './http/routes/index';

import { verifyToken } from './http/middlewares/auth.middleware';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(routes);

// Rota protegida
app.get('/', verifyToken, (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
