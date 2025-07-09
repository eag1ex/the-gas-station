import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  // @Get()
  // @HttpCode(HttpStatus.OK)
  // getRoot() {
  //   return { message: 'Hello World!' };
  // }

  /**
   * Health check endpoint: GET /ping
   *
   * WHY WE NEED THIS:
   * - During deployment or automated testing
   *   there's often check that expects API to respond quickly.
   * - Heroku dynos can be slow to boot, and Prisma might not be ready instantly,
   *   which leads to false negatives in tests:
   *     ❌  [Basic Case] API server: Accessing BASE_URL returns code 404 or times out.
   *
   * - This route performs simple raw query (`SELECT 1`) to confirm DB readiness.
   *   It ensures that the server AND database are both alive and responding.
   * - Useful for uptime checks, CI/CD readiness checks, and general diagnostics.
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
