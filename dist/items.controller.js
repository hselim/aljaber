"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsController = void 0;
const common_1 = require("@nestjs/common");
const RAW_ITEMS = [
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -7.75, 0.25, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -8, 0.5, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -8.25, 0.75, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -8.5, 1, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -8.75, 1.25, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9, 1.5, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.25, 1.75, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.5, 2, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -7.75, 0, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -8, 0.25, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -8.25, 0.5, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -8.5, 0.75, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -8.75, 1, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9, 1.25, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.25, 1.5, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.5, 1.75, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.75, 2, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -8, 0, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -8.25, 0.25, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -8.5, 0.5, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -8.75, 0.75, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9, 1, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.25, 1.25, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.5, 1.5, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.75, 1.75, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -10, 2, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -8.25, 0, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -8.5, 0.25, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -8.75, 0.5, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9, 0.75, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.25, 1, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.5, 1.25, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.75, 1.5, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -10, 1.75, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -10.25, 2, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -8.5, 0, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -8.75, 0.25, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9, 0.5, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.25, 0.75, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.5, 1, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.75, 1.25, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -10, 1.5, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -10.25, 1.75, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -10.5, 2, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -8.75, 0, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9, 0.25, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.25, 0.5, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.5, 0.75, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.75, 1, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -10, 1.25, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -10.25, 1.5, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -10.5, 1.75, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -10.75, 2, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9, 0, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.25, 0.25, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.5, 0.5, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.75, 0.75, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -10, 1, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -10.25, 1.25, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -10.5, 1.5, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -10.75, 1.75, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -11, 2, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.25, 0, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.5, 0.25, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.75, 0.5, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -10, 0.75, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -10.25, 1, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -10.5, 1.25, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -10.75, 1.5, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -11, 1.75, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -11.25, 2, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.5, 0, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -9.75, 0.25, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -10, 0.5, 70],
    ['PMXG', 'Aspheric 1.74 Diamond+ PRO UV400', 'EGMA', 1.74, -10.25, 0.75, 70],
];
const ITEMS = RAW_ITEMS.map(([code, name, brand, index, sphere, cylinder, diameter]) => ({
    code: String(code),
    name: String(name),
    brand: String(brand),
    index: Number(index),
    sphere: Number(sphere),
    cylinder: Number(cylinder),
    diameter: Number(diameter),
}));
let ItemsController = class ItemsController {
    list() {
        return ITEMS;
    }
};
exports.ItemsController = ItemsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ItemsController.prototype, "list", null);
exports.ItemsController = ItemsController = __decorate([
    (0, common_1.Controller)('items')
], ItemsController);
//# sourceMappingURL=items.controller.js.map