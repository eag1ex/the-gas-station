import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('OrdersController (e2e)', () => {
  let app: INestApplication;
  it('should work', () => {
    expect(true).toBe(true);
  });

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /orders - valid request', () => {
    return request(app.getHttpServer())
      .post('/orders')
      .send({
        items: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 1 },
        ],
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.total).toBe(30);
        expect(res.body.currency).toBe('USD');
      });
  });

  it('POST /orders - invalid request', () => {
    return request(app.getHttpServer())
      .post('/orders')
      .send({
        items: [{ productId: 'abc', quantity: 2 }],
      })
      .expect(400)
      .expect((res) => {
        expect(Array.isArray(res.body.message)).toBe(true);
        const errorMessages = res.body.message;
        expect(errorMessages).toEqual(
          expect.arrayContaining([
            expect.stringContaining('productId must be a number'),
          ]),
        );
      });
  });
});
