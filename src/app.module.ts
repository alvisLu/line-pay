import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { getEnvFilePath } from './utils/envLoader';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: getEnvFilePath(),
      validationOptions: {
        abortEarly: false,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        ...config.get('database'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [ConfigModule, AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
