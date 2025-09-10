import { NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
export declare class RequestLoggerMiddleware implements NestMiddleware {
    private readonly baseLogsDir;
    private readonly keepDays;
    use(req: Request, res: Response, next: NextFunction): void;
}
