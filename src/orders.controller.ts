import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import type { CreateOrderInput, Order } from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiBody({
    description: 'Create an order',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        accountNumber: { type: 'string', example: 'ACC123' },
        lensCode: { type: 'string', example: 'PMXG' },
        sphere: { type: 'number', example: -7.75 },
        cylinder: { type: 'number', example: 0.25 },
        diameter: { type: 'number', example: 70 },
        frameId: { type: 'string', example: 'F-1' },
      },
      required: ['id', 'accountNumber', 'lensCode', 'sphere', 'cylinder', 'diameter', 'frameId'],
    },
    examples: {
      sample: {
        summary: 'Typical order',
        value: {
          id: 1,
          accountNumber: 'ACC123',
          lensCode: 'PMXG',
          sphere: -7.75,
          cylinder: 0.25,
          diameter: 70,
          frameId: 'F-1',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Created order',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        accountNumber: { type: 'string', example: 'ACC123' },
        lensCode: { type: 'string', example: 'PMXG' },
        sphere: { type: 'number', example: -7.75 },
        cylinder: { type: 'number', example: 0.25 },
        diameter: { type: 'number', example: 70 },
        frameId: { type: 'string', example: 'F-1' },
      },
    },
  })
  createOrder(@Body() body: CreateOrderInput): Order {
    return this.ordersService.createOrder(body);
  }

  @Get(':orderId')
  @ApiParam({ name: 'orderId', type: Number, example: 1 })
  @ApiOkResponse({
    description: 'Found order',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        accountNumber: { type: 'string', example: 'ACC123' },
        lensCode: { type: 'string', example: 'PMXG' },
        sphere: { type: 'number', example: -7.75 },
        cylinder: { type: 'number', example: 0.25 },
        diameter: { type: 'number', example: 70 },
        frameId: { type: 'string', example: 'F-1' },
      },
    },
  })
  getOrder(@Param('orderId', ParseIntPipe) orderId: number): Order {
    const order = this.ordersService.getOrderById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
}
