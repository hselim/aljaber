export type Item = {
    code: string;
    name: string;
    brand: string;
    index: number;
    sphere: number;
    cylinder: number;
    diameter: number;
};
export declare class ItemsController {
    list(): Item[];
}
