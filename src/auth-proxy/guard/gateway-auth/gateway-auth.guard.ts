import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import {
  AuthProxyService,
  VerifyResult,
} from 'src/auth-proxy/auth-proxy.service';

interface GatewayUser {
  userId: string;
  email: string;
  role: string;
}

@Injectable()
export class GatewayAuthGuard implements CanActivate {
  constructor(private authProxyService: AuthProxyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) throw new UnauthorizedException('ไม่พบ token');

    const result: VerifyResult = await this.authProxyService.verify(token);
    if (!result.valid || !result.payload)
      throw new UnauthorizedException('Token ไม่ถูกต้องหรือหมดอายุ');

    (request as Request & { user: GatewayUser }).user = {
      userId: result.payload.sub,
      email: result.payload.email,
      role: result.payload.role,
    };

    return true;
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
