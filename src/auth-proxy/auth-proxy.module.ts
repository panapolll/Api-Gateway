import { Module } from '@nestjs/common';
import { AuthProxyController } from './auth-proxy.controller';
import { AuthProxyService } from './auth-proxy.service';
import { HttpModule } from '@nestjs/axios';
import { GatewayAuthGuard } from './guard/gateway-auth/gateway-auth.guard';

@Module({
  imports: [HttpModule],
  controllers: [AuthProxyController],
  providers: [AuthProxyService, GatewayAuthGuard],
  exports: [AuthProxyService],
})
export class AuthProxyModule {}
