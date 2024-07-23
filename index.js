import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {mongooseConnect} from './dbconfig/mongooseConnect.js';
import {router} from './src/routes/router.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path'
const server=express();
server.use(express.json());
server.use(cookieParser());
server.use(session({
  secret: process.env.sessionKey,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));
server.use(express.static(path.join(path.resolve(),'public')));
server.use(router);
// server.use(express.static('public'));
//handling requests with mismatch url
server.use((req,res)=>{
    res.status(404).send('url is not found');
})
server.listen(3200,()=>{
    console.log('server is listeining from the port 3200');
    mongooseConnect();
})