import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CartProxyController } from './cart-proxy.controller';
import { CommerceProxyModule } from '../commerce-proxy/commerce-proxy.module';
import { AuthProxyModule } from '../auth-proxy/auth-proxy.module';

@Module({
  imports: [HttpModule, CommerceProxyModule, AuthProxyModule],
  controllers: [CartProxyController],
})
export class CartProxyModule {}
