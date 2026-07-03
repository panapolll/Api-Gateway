import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { GatewayAuthGuard } from 'src/auth-proxy/guard/gateway-auth/gateway-auth.guard';
import { CommerceProxyService } from 'src/commerce-proxy/commerce-proxy.service';

interface RequestWithUser extends Request {
  user: { userId: string; email: string; role: string };
}

@Controller('orders')
@UseGuards(GatewayAuthGuard)
export class OrdersProxyController {
  constructor(private commerceProxyService: CommerceProxyService) {}

  @Post('checkout')
  checkout(@Req() req: RequestWithUser) {
    return this.commerceProxyService.forward(
      'POST',
      '/orders/checkout',
      req.user,
    );
  }

  @Get('me')
  getMyOrders(@Req() req: RequestWithUser) {
    return this.commerceProxyService.forward('GET', '/orders/me', req.user);
  }
}
