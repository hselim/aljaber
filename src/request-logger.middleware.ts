import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function ensureDir(directoryPath: string) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

function pruneOldLogs(baseDir: string, keepDays: number) {
  try {
    if (!fs.existsSync(baseDir)) return;
    const entries = fs.readdirSync(baseDir, { withFileTypes: true });
    const now = new Date();
    const cutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate() - keepDays + 1);
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const dirName = entry.name; // expected YYYY-MM-DD
      const fullPath = path.join(baseDir, dirName);
      const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dirName);
      if (!match) continue;
      const dirDate = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
      if (dirDate < cutoff) {
        fs.rmSync(fullPath, { recursive: true, force: true });
      }
    }
  } catch {
    // ignore pruning errors to avoid impacting requests
  }
}

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly baseLogsDir = path.resolve(process.cwd(), 'logs');
  private readonly keepDays = Number(process.env.LOG_KEEP_DAYS ?? 7);

  use(req: Request, res: Response, next: NextFunction) {
    const start = process.hrtime.bigint();
    const requestId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    const day = formatDate(new Date());
    const dayDir = path.join(this.baseLogsDir, day);
    ensureDir(dayDir);

    const logFile = path.join(dayDir, `${requestId}.log`);
    const startedAt = new Date().toISOString();

    const logStart = {
      time: startedAt,
      type: 'request',
      id: requestId,
      method: req.method,
      path: (req as any).originalUrl || req.url,
      ip: (req as any).ip,
      headers: req.headers,
      body: (req as any).body,
      query: (req as any).query,
      params: (req as any).params,
    };

    try {
      fs.writeFileSync(logFile, JSON.stringify(logStart, null, 2) + '\n');
    } catch {
      // ignore write errors
    }

    res.on('finish', () => {
      const end = process.hrtime.bigint();
      const durationMs = Number(end - start) / 1_000_000;
      const finishedAt = new Date().toISOString();
      const logEnd = {
        time: finishedAt,
        type: 'response',
        id: requestId,
        statusCode: (res as any).statusCode,
        durationMs: Number(durationMs.toFixed(3)),
      };
      try {
        fs.appendFileSync(logFile, JSON.stringify(logEnd, null, 2) + '\n');
      } catch {
        // ignore write errors
      }

      // prune old daily folders asynchronously after response is sent
      setImmediate(() => pruneOldLogs(this.baseLogsDir, this.keepDays));
    });

    next();
  }
}


