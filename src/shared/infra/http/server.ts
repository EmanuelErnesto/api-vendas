import 'dotenv/config';
import 'reflect-metadata';
import { dataSource } from '../typeorm';
import { app } from './app';

const PORT = process.env.PORT || 8000;

dataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
