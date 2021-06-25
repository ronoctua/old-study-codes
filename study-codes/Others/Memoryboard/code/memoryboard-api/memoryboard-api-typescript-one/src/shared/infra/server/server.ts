import { httpServer } from './app';

httpServer.listen(process.env.APP_SERVER_PORT || 3333, () => {
  console.log(
    `✔ Server started on port ${process.env.APP_SERVER_PORT || 3333}`,
  );
});
