import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import express from 'express';
import { LoginDto, RefreshTokenDto, RegisterDto } from 'src/dto/proxy.dto';
import { AuthProxyService } from './auth-proxy.service';
import { GatewayAuthGuard } from './guard/gateway-auth/gateway-auth.guard';

@Controller('auth')
export class AuthProxyController {
  constructor(private authProxyService: AuthProxyService) {}

  @Post('refresh')
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authProxyService.refresh(dto.userId, dto.refreshToken);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authProxyService.login(dto.email, dto.password);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authProxyService.register(dto.email, dto.password);
  }

  // route ทดสอบที่ต้อง login ก่อน
  @UseGuards(GatewayAuthGuard)
  @Get('profile')
  getProfile(@Req() req: express.Request) {
    return (req as express.Request & { user: unknown }).user;
  }
}
