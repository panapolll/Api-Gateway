import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { GatewayAuthGuard } from 'src/auth-proxy/guard/gateway-auth/gateway-auth.guard';
import { CommerceProxyService } from 'src/commerce-proxy/commerce-proxy.service';

interface RequestWithUser extends Request {
  user: { userId: string; email: string; role: string };
}

@Controller('payments')
export class PaymentsProxyController {
  constructor(private commerceProxyService: CommerceProxyService) {}

  @Post('charge')
  @UseGuards(GatewayAuthGuard)
  charge(
    @Req() req: RequestWithUser,
    @Body() body: { orderId: string; token: string },
  ) {
    return this.commerceProxyService.forward(
      'POST',
      '/payments/charge',
      req.user,
      body,
    );
  }
}
