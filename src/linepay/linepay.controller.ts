import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LinepayService } from './linepay.service';
import { RequestPaymentDto } from './dto/request-payment.dto';

@Controller('linepay')
export class LinepayController {
  constructor(private readonly linepayService: LinepayService) {}

  @Post('payment')
  requestPayments(@Body() dto: RequestPaymentDto) {
    return this.linepayService.onlinePayment(dto);
  }

  @Get('confirm')
  confirm(
    @Query('transactionId') transactionId: string,
    @Query('orderId') orderId: string,
  ) {
    return this.linepayService.confirm(transactionId, orderId);
  }
}
