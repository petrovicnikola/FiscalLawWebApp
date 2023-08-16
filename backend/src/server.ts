import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './routers/user.router';
import adminRouter from './routers/admin.router';
import firmRouter from './routers/firm.router';
import productRouter from './routers/product.router';

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))

mongoose.connect('mongodb://localhost:27017/app_db');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('db connection sucessfull');
});

const router = express.Router();
router.use('/users', userRouter);
router.use('/admin', adminRouter);
router.use('/firm', firmRouter);
router.use('/products', productRouter);

app.use('/', router);


app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));