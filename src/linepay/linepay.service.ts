import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { firstValueFrom } from 'rxjs';
import { RequestPaymentDto } from './dto/request-payment.dto';

@Injectable()
export class LinepayService {
  private readonly serviceHost: string;
  private readonly channelId: string;
  private readonly channelSecret: string;
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.serviceHost = this.configService.get<string>('service.host');
    this.channelId = this.configService.get<string>('linePay.channelId');
    this.channelSecret = this.configService.get<string>(
      'linePay.channelSecret',
    );
    this.apiUrl = this.configService.get<string>('linePay.apiUrl');
  }

  private createSignature(uri: string, body: string, nonce: string): string {
    const signatureString = this.channelSecret + uri + body + nonce;
    return crypto
      .createHmac('sha256', this.channelSecret)
      .update(signatureString)
      .digest('base64');
  }

  async handleApiRequest(method: string, uri: string, body: any = {}) {
    const nonce = Date.now().toString();
    const requestBody = JSON.stringify(body);
    const signature = this.createSignature(uri, requestBody, nonce);

    const headers = {
      'Content-Type': 'application/json',
      'X-LINE-ChannelId': this.channelId,
      'X-LINE-Authorization-Nonce': nonce,
      'X-LINE-Authorization': signature,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.request({
          method,
          url: `${this.apiUrl}${uri}`,
          headers,
          data: requestBody,
        }),
      );
      return response.data;
    } catch (error) {
      throw new Error(`LINE Pay API Error: ${error.message}`);
    }
  }

  async onlinePayment(dto: RequestPaymentDto) {
    const { amount, orderId, packages } = dto;
    const uri = '/v3/payments/request';
    const testOrderId = `${orderId}-${Date.now()}`;

    const body = {
      amount,
      packages,
      orderId: testOrderId,
      currency: 'TWD',
      redirectUrls: {
        confirmUrl: `${this.serviceHost}/linepay/confirm`,
      },
    };

    return this.handleApiRequest('POST', uri, body);
  }
}
