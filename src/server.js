import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); 

import handlebars from 'express-handlebars';
import session from 'express-session';
import {
      Server
} from 'socket.io';
import cookieParser from 'cookie-parser';
import CONFIG from './config/environment/config.js';
import __dirname from './__dirname.js';
import {
      MongoManager
} from './models/manager/mongo/mongo.manager.js';

import passport from 'passport';
import initPassport from './config/passport/passport.config.js';

import router from './routes/app.routes.js';

const app = express();

const PORT = CONFIG.PORT;
const SECRET = CONFIG.SECRET;

MongoManager.start();

const httpServer = app.listen(PORT, () => {
      console.log(`Server corriendo en el puerto: ${PORT}`);
});

export const io = new Server(httpServer);

if (process.env.NODE_ENV !== 'production') {
  
  import ('dotenv').config();
}

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
      extended: true
}));

app.use(session({
      secret: process.env.SESSION_SECRET || 'mi_valor_predeterminado',
      resave: false,
      saveUninitialized: false,
}));

initPassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/', router);