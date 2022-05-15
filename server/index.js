import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send({ message: 'Node.js, Express, and Postgres API' });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
