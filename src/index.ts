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


// Rota de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Autenticação
  if (username === 'meuusuario' && password === 'minhasenha') {
    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET as string, { expiresIn: 300 });
    res.send({ auth: true, token: token });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

// Rota protegida
app.get('/', verifyToken, (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
