import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GatewayAuthGuard } from 'src/auth-proxy/guard/gateway-auth/gateway-auth.guard';
import { CommerceProxyService } from 'src/commerce-proxy/commerce-proxy.service';

interface RequestWithUser extends Request {
  user: { userId: string; email: string; role: string };
}

@Controller('cart')
@UseGuards(GatewayAuthGuard)
export class CartProxyController {
  constructor(private commerceProxyService: CommerceProxyService) {}

  @Get()
  getCart(@Req() req: RequestWithUser) {
    return this.commerceProxyService.forward('GET', '/cart', req.user);
  }

  @Post('items')
  addItem(
    @Req() req: RequestWithUser,
    @Body() body: { productId: string; quantity: string },
  ) {
    return this.commerceProxyService.forward(
      'POST',
      '/cart/items',
      req.user,
      body,
    );
  }

  @Delete('items/:productId')
  removeItem(
    @Req() req: RequestWithUser,
    @Param('productId') productId: string,
  ) {
    return this.commerceProxyService.forward(
      'DELETE',
      `/cart/items/${productId}`,
      req.user,
    );
  }
}
