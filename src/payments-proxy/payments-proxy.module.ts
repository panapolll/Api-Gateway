import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PaymentsProxyController } from './payments-proxy.controller';
import { CommerceProxyModule } from '../commerce-proxy/commerce-proxy.module';
import { AuthProxyModule } from '../auth-proxy/auth-proxy.module';

@Module({
  imports: [HttpModule, CommerceProxyModule, AuthProxyModule],
  controllers: [PaymentsProxyController],
})
export class PaymentsProxyModule {}
