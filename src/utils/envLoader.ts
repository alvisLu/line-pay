import * as fs from 'fs';
import * as path from 'path';

const appRoot = path.join(__dirname, '../..');

export const getEnvFilePath = () => {
  const env = process.env.NODE_ENV;

  const envFileByEnv = env ? `.env.${env}` : '.env';

  if (fs.existsSync(path.join(appRoot, envFileByEnv))) {
    return envFileByEnv;
  } else {
    return '.env';
  }
};
