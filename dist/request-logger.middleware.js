"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestLoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function ensureDir(directoryPath) {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
}
function pruneOldLogs(baseDir, keepDays) {
    try {
        if (!fs.existsSync(baseDir))
            return;
        const entries = fs.readdirSync(baseDir, { withFileTypes: true });
        const now = new Date();
        const cutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate() - keepDays + 1);
        for (const entry of entries) {
            if (!entry.isDirectory())
                continue;
            const dirName = entry.name;
            const fullPath = path.join(baseDir, dirName);
            const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dirName);
            if (!match)
                continue;
            const dirDate = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
            if (dirDate < cutoff) {
                fs.rmSync(fullPath, { recursive: true, force: true });
            }
        }
    }
    catch {
    }
}
let RequestLoggerMiddleware = class RequestLoggerMiddleware {
    baseLogsDir = path.resolve(process.cwd(), 'logs');
    keepDays = Number(process.env.LOG_KEEP_DAYS ?? 7);
    use(req, res, next) {
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
            path: req.originalUrl || req.url,
            ip: req.ip,
            headers: req.headers,
            body: req.body,
            query: req.query,
            params: req.params,
        };
        try {
            fs.writeFileSync(logFile, JSON.stringify(logStart, null, 2) + '\n');
        }
        catch {
        }
        res.on('finish', () => {
            const end = process.hrtime.bigint();
            const durationMs = Number(end - start) / 1_000_000;
            const finishedAt = new Date().toISOString();
            const logEnd = {
                time: finishedAt,
                type: 'response',
                id: requestId,
                statusCode: res.statusCode,
                durationMs: Number(durationMs.toFixed(3)),
            };
            try {
                fs.appendFileSync(logFile, JSON.stringify(logEnd, null, 2) + '\n');
            }
            catch {
            }
            setImmediate(() => pruneOldLogs(this.baseLogsDir, this.keepDays));
        });
        next();
    }
};
exports.RequestLoggerMiddleware = RequestLoggerMiddleware;
exports.RequestLoggerMiddleware = RequestLoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], RequestLoggerMiddleware);
//# sourceMappingURL=request-logger.middleware.js.map