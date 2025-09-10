import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly apiKey = process.env.API_KEY || '';

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Allow Swagger docs and assets without API key
    const url: string = (request.originalUrl || request.url) as string;
    if (url.startsWith('/docs') || url.startsWith('/api')) {
      return true;
    }

    const headerKey = request.headers['x-api-key'] as string | undefined;
    const queryKey = (request.query?.api_key as string | undefined) || (request.query?.apiKey as string | undefined);
    const provided = headerKey || queryKey || '';
    if (!this.apiKey) {
      // If not configured, deny to avoid open exposure
      throw new UnauthorizedException('API key not configured');
    }
    if (provided !== this.apiKey) {
      throw new UnauthorizedException('Invalid API key');
    }
    return true;
  }
}


