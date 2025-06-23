import express from 'express';
import path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectFlash from 'connect-flash';
import session from 'express-session';
import loginStatus from './middlewares/loginStatus.js';
dotenv.config();

import db from './config/mongooseConnection.js';

import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'
import vendorRouter from './routes/vendorRouter.js'
import storeRouter from './routes/storeRouter.js'

const app = express();
const __dirname = path.join('./');

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,'/public')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,// Set to true if using HTTPS
}));

app.use(loginStatus);

app.use(connectFlash());

app.use('/',storeRouter)
app.use('/users',userRouter)
app.use('/vendors',vendorRouter)
app.use('/products',productRouter)


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
    console.log("Session secret env:", process.env.SESSION_SECRET);

});