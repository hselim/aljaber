import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import type { CreateOrderInput, Order } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() body: CreateOrderInput): Order {
    return this.ordersService.createOrder(body);
  }

  @Get(':orderId')
  getOrder(@Param('orderId', ParseIntPipe) orderId: number): Order {
    const order = this.ordersService.getOrderById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
}
