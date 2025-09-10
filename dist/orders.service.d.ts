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
export declare class OrdersService {
    private orders;
    private nextId;
    createOrder(input: CreateOrderInput): Order;
    getOrderById(id: number): Order | undefined;
}
