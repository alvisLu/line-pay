import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';
const fileExtension = process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ``;
require('dotenv').config({ path: `.env${fileExtension}` });

const options: DataSourceOptions = {
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT, 10) || 3306,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [path.join(__dirname, 'src/models/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, 'src/migrations/*{.ts,.js}')],
};

export const AppDataSource = new DataSource(options);
