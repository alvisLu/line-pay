import * as path from 'path';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export default () => {
  const serviceConfig = {
    host: process.env.SERVER_HOST,
    port: parseInt(process.env.SERVER_PORT, 10) || 4000,
  };

  const connectionConfig: MysqlConnectionOptions = {
    type: 'mysql',
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10) || 3306,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [path.join(__dirname, '../models/**/*.entity{.ts,.js}')],
    migrations: [path.join(__dirname, '../migrations/*{.ts,.js}')],
  };

  const linePayConfig = {
    channelId: process.env.LINEPAY_CHANNEL_ID,
    channelSecret: process.env.LINEPAY_CHANNEL_SECRET,
    apiUrl: process.env.LINEPAY_API_URL,
  };

  return {
    service: serviceConfig,
    database: connectionConfig,
    linePay: linePayConfig,
  };
};
