import { Module } from '@nestjs/common';
import { AuthProxyModule } from './auth-proxy/auth-proxy.module';
import { ConfigModule } from '@nestjs/config';
import { CommerceProxyModule } from './commerce-proxy/commerce-proxy.module';
import { CartProxyModule } from './cart-proxy/cart-proxy.module';
import { OrdersProxyModule } from './orders-proxy/orders-proxy.module';
import { PaymentsProxyModule } from './payments-proxy/payments-proxy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthProxyModule,
    CommerceProxyModule,
    CartProxyModule,
    OrdersProxyModule,
    PaymentsProxyModule,
  ],
})
export class AppModule {}
