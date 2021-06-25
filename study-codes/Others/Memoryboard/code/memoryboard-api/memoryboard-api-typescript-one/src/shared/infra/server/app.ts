import 'reflect-metadata';
import 'dotenv/config';

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import http from 'http';
import io from 'socket.io';

import '@shared/container';

import uploadConfig from '@config/upload';
import { HandleError } from '@shared/errors/HandleError';

import { router } from './routes';

const app = express();

const httpServer = http.createServer(app);
const socketIo = new io.Server(httpServer, {
  cors: {
    origin: '*',
  },
});

app.use(cors());

app.use(express.json());

app.use('/files/public', express.static(uploadConfig.uploadsFolder));

app.use(router);

const socketIoData: {
  [key: string]: string;
} = {};

socketIo.sockets.on('connection', (socket) => {
  console.log(`New socket.io connection: ${socket.id}`);

  setTimeout(() => {
    console.log(`Socket.io disconnection: ${socket.id}`);
    socket.disconnect(true);
  }, 300000);

  socket.on('noteId', (noteIdRoom: number) => {
    socket.join(`${noteIdRoom}-content`);

    if (socketIoData[`${noteIdRoom}-content`]) {
      const data = {
        id: noteIdRoom,
        content: socketIoData[`${noteIdRoom}-content`],
      };

      socketIo.sockets
        .in(`${noteIdRoom}-content`)
        .emit(`${noteIdRoom}-content`, data);
    }

    socket.on(`${noteIdRoom}-content`, (content) => {
      socketIoData[`${noteIdRoom}-content`] = content;

      const data = {
        id: noteIdRoom,
        content: socketIoData[`${noteIdRoom}-content`],
      };

      socketIo.sockets
        .in(`${noteIdRoom}-content`)
        .emit(`${noteIdRoom}-content`, data);
    });

    socket.on(`${noteIdRoom}-latestNote`, () => {
      const data = {
        id: noteIdRoom,
        content: socketIoData[`${noteIdRoom}-content`]
          ? socketIoData[`${noteIdRoom}-content`]
          : null,
      };

      socketIo.sockets
        .in(`${noteIdRoom}-content`)
        .emit(`${noteIdRoom}-content`, data);
    });
  });
});

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof HandleError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

export { socketIo, app, httpServer };
