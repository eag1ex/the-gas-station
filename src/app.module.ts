import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { RecipesModule } from './recipes/recipes.module';
@Module({
  imports: [
    OrdersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: (() => {
        switch (process.env.NODE_ENV) {
          case 'production':
            return '.env.prod';
          case 'test':
            return '.env.test';
          default:
            return '.env';
        }
      })(),
    }),
    ProductsModule,
    RecipesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Apply to all routes
  }
}
