const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//routes
const authRoutes = require('./routes/authRouter');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/categoryRouter');
const productRoutes = require('./routes/productRouter');
const cartRoutes = require('./routes/cartRouter');
const initialDataRoutes = require('./routes/admin/initialData');
const pageRoutes = require('./routes/admin/page');
const addressRoutes = require("./routes/addressRouter");
const orderRoutes = require("./routes/orderRouter");
const adminOrderRoute = require("./routes/admin/order.routes");

//environment variable or you can say constants
env.config();

//MongoDB connection
//mongodb+srv://<username>:<password>@cluster0.emgnm5g.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PWD}@cluster0.emgnm5g.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`)
.then(() => {
    console.log("Database is connected");
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((err)=>{
    console.log("Database connection error");
    console.log(err);
});

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialDataRoutes);
app.use('/api', pageRoutes);
app.use('/api', addressRoutes);
app.use('/api', orderRoutes);
app.use('/api', adminOrderRoute);
