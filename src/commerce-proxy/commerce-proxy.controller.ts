/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { CommerceProxyService } from './commerce-proxy.service';
import { GatewayAuthGuard } from 'src/auth-proxy/guard/gateway-auth/gateway-auth.guard';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

interface RequestWithUser extends Request {
  user: { userId: string; email: string; role: string };
}

@Controller('products')
export class CommerceProxyController {
  constructor(private commerceProxyService: CommerceProxyService) {}

  @Get()
  findAll() {
    return this.commerceProxyService.forward('GET', '/products');
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.commerceProxyService.forward('GET', `/products/${id}`);
  }

  @Post()
  @UseGuards(GatewayAuthGuard)
  create(@Req() req: RequestWithUser, @Body() dto: CreateProductDto) {
    const user = {
      userId: req.user.userId ?? (req.user as any).sub,
      email: req.user.email,
      role: req.user.role,
    };
    return this.commerceProxyService.forward('POST', '/products', user, dto);
  }

  @Put(':id')
  @UseGuards(GatewayAuthGuard)
  update(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.commerceProxyService.forward(
      'PUT',
      `/products/${id}`,
      req.user,
      dto,
    );
  }

  @Delete(':id')
  @UseGuards(GatewayAuthGuard)
  delete(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.commerceProxyService.forward(
      'DELETE',
      `/products/${id}`,
      req.user,
    );
  }
}
