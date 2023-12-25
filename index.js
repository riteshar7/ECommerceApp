const env = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const path = require('path')

//Routes
const userRoutes = require('./routes/userRouter');
const consumerRoutes = require('./routes/consumerRouter');
const categoryRoutes = require('./routes/categoryRouter');
const productRoutes = require('./routes/productRouter');
const cartRoutes = require('./routes/cartRouter');

//Environment variables
env.config();

//MongoDB connection
//mongodb+srv://<username>:<password>@cluster0.emgnm5g.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@cluster0.emgnm5g.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`)
.then(() => {
    console.log("Database is connected");
})
.catch((err)=>{
    console.log("Database connection error");
    console.log(err);
});

//Middlewares
app.use(bodyParser());
app.use('/uploads',express.static( path.join(__dirname,'uploads')));
app.use(express.static( path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use('/accounts', userRoutes);
app.use('/consumer', consumerRoutes);
app.use('/category', categoryRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

// app.get('/',(req,res,next) => {
//     res.status(200).json({
//         message: 'Hello from server'
//     });
// });

// app.post('/data',(req,res,next) => {
//     res.status(200).json({
//         message: req.body
//     });
// });

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});