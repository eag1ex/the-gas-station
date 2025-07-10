// src/common/middleware/logger.middleware.ts
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // for debugging
    if (process.env.NODE_ENV === 'development') {
      Logger.log(`[${req.method}] ${req.originalUrl}`);
    }
    next();
  }
}
