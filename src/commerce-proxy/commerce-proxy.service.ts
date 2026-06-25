import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, Method } from 'axios';
import { firstValueFrom } from 'rxjs';

interface GatewayUser {
  userId: string;
  email: string;
  role: string;
}

@Injectable()
export class CommerceProxyService {
  private commerceApiUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.commerceApiUrl =
      this.configService.get<string>('COMMERCE_API_URL') ??
      'http://localhost:3000';
  }

  async forward<T>(
    method: Method,
    path: string,
    user?: GatewayUser,
    data?: unknown,
  ): Promise<T> {
    try {
      const response = await firstValueFrom(
        this.httpService.request<T>({
          method,
          url: `${this.commerceApiUrl}${path}`,
          data,
          headers: user
            ? {
                'x-user-id': user.userId,
                'x-user-email': user.email,
                'x-user-role': user.role,
              }
            : {},
        }),
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response) {
        throw new HttpException(
          axiosError.response.data?.message ?? 'เกิดข้อผิดพลาด commerce-api',
          axiosError.response.status,
        );
      }
      throw new HttpException('ไม่สามารถเชื่อมต่อ commerce-api ได้', 503);
    }
  }
}
