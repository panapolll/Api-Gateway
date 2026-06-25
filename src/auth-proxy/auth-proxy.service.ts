import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface VerifyResult {
  valid: boolean;
  payload: { sub: string; email: string; role: string } | null;
}

export interface RegisterResult {
  id: string;
  email: string;
  role: string;
}

@Injectable()
export class AuthProxyService {
  private authServiceUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.authServiceUrl =
      this.configService.get<string>('AUTH_SERVICE_URL') ??
      'http://localhost:3100';
  }

  async login(email: string, password: string): Promise<AuthTokens> {
    return this.forward<AuthTokens>('/auth/login', { email, password });
  }

  async register(email: string, password: string): Promise<RegisterResult> {
    return this.forward<RegisterResult>('/auth/register', { email, password });
  }

  async verify(token: string): Promise<VerifyResult> {
    return this.forward<VerifyResult>('/auth/verify', { token });
  }

  // ฟังก์ชันกลางสำหรับยิง request ไป auth-service และจัดการ error
  private async forward<T>(
    path: string,
    body: Record<string, string>,
  ): Promise<T> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<T>(`${this.authServiceUrl}${path}`, body),
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      // ถ้า auth-service ตอบกลับมาเป็น error ปกติ (เช่น 404, 401) ส่งต่อ message เดิม
      if (axiosError.response) {
        throw new HttpException(
          axiosError.response.data?.message ?? 'เกิดข้อผิดพลาดจาก auth-service',
          axiosError.response.status,
        );
      }

      // ถ้า auth-service ปิดอยู่หรือเชื่อมต่อไม่ได้
      throw new HttpException('ไม่สามารถเชื่อมต่อ auth-service ได้', 503);
    }
  }
}
