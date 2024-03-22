"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productIdValidation = exports.updateProductValidation = exports.listProductValidation = exports.productValidation = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateProduct:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: Le nom du produit
 *         price:
 *           type: number
 *           description: Le prix du produit
 *       example:
 *         name: Exemple de produit
 *         price: 19.99
 */
exports.productValidation = joi_1.default.object({
    name: joi_1.default.string()
        .min(3)
        .required(),
    price: joi_1.default.number()
        .required(),
}).options({ abortEarly: false });
exports.listProductValidation = joi_1.default.object({
    page: joi_1.default.number().min(1).optional(),
    limit: joi_1.default.number().min(1).optional(),
    priceMax: joi_1.default.number().min(1).optional()
});
exports.updateProductValidation = joi_1.default.object({
    id: joi_1.default.number().required(),
    price: joi_1.default.number().min(1).optional()
});
exports.productIdValidation = joi_1.default.object({
    id: joi_1.default.number().required(),
});
