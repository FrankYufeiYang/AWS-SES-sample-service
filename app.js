import express from 'express';
import cors from 'cors';
import emailRouter from './routes/route.js';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/', express.static('public'));
app.use(emailRouter);
const port = 3002;
app.get('/hello', (req, response) => {
  response.status(200).send('hello');
});

app.listen(port, () => {
  console.log('running on ' + port);
});
