import { Module } from '@nestjs/common';
import { LinepayService } from './linepay.service';
import { LinepayController } from './linepay.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [LinepayController],
  providers: [LinepayService],
})
export class LinepayModule {}
