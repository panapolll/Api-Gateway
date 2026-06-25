import { Module } from '@nestjs/common';
import { AuthProxyModule } from './auth-proxy/auth-proxy.module';
import { ConfigModule } from '@nestjs/config';
import { CommerceProxyModule } from './commerce-proxy/commerce-proxy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthProxyModule,
    CommerceProxyModule,
  ],
})
export class AppModule {}
