import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CommerceProxyController } from './commerce-proxy.controller';
import { AuthProxyModule } from 'src/auth-proxy/auth-proxy.module';
import { GatewayAuthGuard } from 'src/auth-proxy/guard/gateway-auth/gateway-auth.guard';
import { CommerceProxyService } from './commerce-proxy.service';

@Module({
  imports: [HttpModule, AuthProxyModule],
  controllers: [CommerceProxyController],
  providers: [CommerceProxyService, GatewayAuthGuard],
  exports: [CommerceProxyService],
})
export class CommerceProxyModule {}
