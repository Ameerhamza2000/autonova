const express=require('express');
const app=express();
const auth=require('./middleware/auth');
const cors=require('cors');
const dotenv=require('dotenv');


// routes handler
const expenseRouter=require('./routes/expenses');
const userRouter=require('./routes/signup');
const loginRouter=require('./routes/login');
const forgotPasswordRouter=require('./routes/forgotpassword')
const vehicleRouter=require('./routes/vehicle');
const connectDB = require('./config/connectDB');

// dot env config
dotenv.config();

// DB connection
connectDB();

// middleware
app.use(express.json());
app.use(cors());

// route api's
app.use('/register',userRouter);
app.use('/login',loginRouter);
app.use('/forgotpassword',forgotPasswordRouter);
app.use(auth);
app.use('/car/create',vehicleRouter);
app.use('/expense',expenseRouter);

// server port
const PORT=process.env.PORT ||3000
app.listen(PORT,()=>console.log(`Listening on port ${PORT}......`));