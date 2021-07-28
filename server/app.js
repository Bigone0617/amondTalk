// global import
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';


// local import
import authRouter from './Router/auth.js';
import chatRouter from './Router/chat.js';
import friendRouter from './Router/friend.js'
import { config } from './config.js';
import { sequelize } from './database/database.js';
import { initSocket } from './connection/socket.js';

const app = express();

const corsOption = {
    origin: config.cors.allowedOrigin,
    optionsSuccessStatus: 200,
}

app.use(express.json());
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan('tiny'));

app.use('/auth', authRouter);
app.use('/chat', chatRouter);
app.use('/friend', friendRouter);

app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});

sequelize.sync().then(() => {
    console.log(`Server is started... ${new Date()}`);
    const server = app.listen(config.port);
    initSocket(server);
});