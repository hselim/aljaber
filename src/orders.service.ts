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

export type CreateOrderInput = Omit<Order, 'id'>;

@Injectable()
export class OrdersService {
  private orders: Order[] = [];
  private nextId = 1;

  createOrder(input: CreateOrderInput): Order {
    const newOrder: Order = {
      id: this.nextId++,
      accountNumber: input.accountNumber,
      lensCode: input.lensCode,
      sphere: input.sphere,
      cylinder: input.cylinder,
      diameter: input.diameter,
      frameId: input.frameId,
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  getOrderById(id: number): Order | undefined {
    return this.orders.find((o) => o.id === id);
  }
}
