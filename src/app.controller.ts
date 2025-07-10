import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Response } from 'express';
@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  /** Quick static call to BASE_URL */
  @Get()
  @HttpCode(200)
  getRoot(@Res() res: Response) {
    res.setHeader('Cache-Control', 'public, max-age=600');
    res.setHeader('Content-Type', 'text/plain');
    res.send('Welcome to The Gas Station API');
  }

  /**
   * Health check endpoint: GET /ping
   */
  @Get('ping')
  @HttpCode(HttpStatus.OK)
  async ping() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ok', message: 'pong' };
    } catch (error) {
      return { status: 'error', message: 'Database unavailable' };
    }
  }
}
