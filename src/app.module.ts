import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './api-key.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ItemsController } from './items.controller';
import { RequestLoggerMiddleware } from './request-logger.middleware';

@Module({
  imports: [],
  controllers: [AppController, OrdersController, ItemsController],
  providers: [AppService, OrdersService, { provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
