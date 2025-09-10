export type Order = {
    id: number;
    accountNumber: string;
    lensCode: string;
    sphere: number;
    cylinder: number;
    diameter: number;
    frameId: string;
};
export type CreateOrderInput = Order;
export declare class OrdersService {
    private orders;
    createOrder(input: CreateOrderInput): Order;
    getOrderById(id: number): Order | undefined;
}
