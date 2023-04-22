import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import * as dotenv from 'dotenv';
import routes from './http/routes/index';

import { verifyToken } from './http/middlewares/auth.middleware';
import { isAdmin } from './http/middlewares/admin.middleware';

dotenv.config();

const app = express();

const secret =  process.env.JWT_SECRET as string;
const sessionOptions: session.SessionOptions = {
  secret: secret,
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionOptions));


app.use(cors());
app.use(bodyParser.json());

app.use(routes);

// Rota protegida
app.get('/', verifyToken, isAdmin, (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
