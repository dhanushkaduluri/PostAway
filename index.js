import express from 'express';
import cookieParser from 'cookie-parser'
import swagger from 'swagger-ui-express'

import { ApplicationLevelErrorHandler } from './src/middlewares/errorHandler.middleware.js';
import userRouter from './src/features/user/user.routes.js';
import otpRouter from './src/features/otp/otp.routes.js';
import postRouter from './src/features/posts/post.routes.js';
import { jwtAuth } from './src/middlewares/jwtAuth.middleware.js';
import likeRouter from './src/features/likes/likes.routes.js';
import commentRouter from './src/features/comments/comments.routes.js';
import friendsRouter from './src/features/friendships/friend.routes.js';
import apiDocs from './documentation.json' assert{type:'json'};


// environment variables
import dotenv from 'dotenv';
dotenv.config();


const server=express();

server.use('/api-docs',swagger.serve,swagger.setup(apiDocs));

server.use(cookieParser());
server.use(express.json());

// server.use(express.static('public'));

// request listening middlewares
server.use('/api/users',userRouter)

server.use('/api/otp',otpRouter)

server.use('/api/posts',jwtAuth,postRouter)

server.use('/api/likes',jwtAuth, likeRouter)

server.use('/api/comments',jwtAuth,commentRouter)

server.use('/api/friends',jwtAuth,friendsRouter)


// application level error handling middleware
server.use(ApplicationLevelErrorHandler);

export default server;