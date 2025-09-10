import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ItemsController } from './items.controller';

@Module({
  imports: [],
  controllers: [AppController, OrdersController, ItemsController],
  providers: [AppService, OrdersService],
})
export class AppModule {}
