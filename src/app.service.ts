import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'The AL Jaber Server is working and Running well !';
  }
}
