import { Injectable } from '@nestjs/common';

export type Order = {
  id: number;
  accountNumber: string;
  lensCode: string;
  sphere: number;
  cylinder: number;
  diameter: number;
  frameId: string;
};

export type CreateOrderInput = Order; // client provides id in the request

@Injectable()
export class OrdersService {
  private orders: Order[] = [];

  createOrder(input: CreateOrderInput): Order {
    const existingIndex = this.orders.findIndex((o) => o.id === input.id);
    const order: Order = {
      id: input.id,
      accountNumber: input.accountNumber,
      lensCode: input.lensCode,
      sphere: input.sphere,
      cylinder: input.cylinder,
      diameter: input.diameter,
      frameId: input.frameId,
    };
    if (existingIndex >= 0) {
      this.orders[existingIndex] = order;
    } else {
      this.orders.push(order);
    }
    return order;
  }

  getOrderById(id: number): Order | undefined {
    return this.orders.find((o) => o.id === id);
  }
}
