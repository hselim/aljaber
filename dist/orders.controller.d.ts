import { OrdersService } from './orders.service';
import type { CreateOrderInput, Order } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(body: CreateOrderInput): Order;
    getOrder(orderId: number): Order;
}
