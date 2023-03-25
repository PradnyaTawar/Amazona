import express from 'express';
import data from './data.js';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import productRouter from './routes/productRoutes.js';
import seedRouter from './routes/seedRoutes.js';

dotenv.config();
const app = express();
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL);
mongoose.connection.on('connected', () => {
    console.log('db connected');
})
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);

app.get('/api/products/slug/:slug', (req, res) => {
    const product = data.products.find((x) => x.slug === req.params.slug);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  });

  app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  });

const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`server started at: ${port}`) 
})