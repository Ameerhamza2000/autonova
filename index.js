const express=require('express');
const app=express();
const auth=require('./middleware/auth');
const cors=require('cors');
const connectDB=require('./config/connectDB');
const dotenv=require('dotenv');


// routes handler
const expenseRouter=require('./routes/expenses');
const userRouter=require('./routes/signup');
const loginRouter=require('./routes/login');
const connectDB = require('./config/connectDB');

// dot env config
dotenv.config();

// DB connection
connectDB();

// middleware
app.use(express.json());
app.use(cors());

// route api's
app.use('/signup',userRouter);
app.use('/login',loginRouter);
app.use(auth);
app.use('/expense',expenseRouter);

// server port
const PORT=process.env.port || 3000
app.listen(PORT,()=>console.log(`Listening on port ${PORT}......`));