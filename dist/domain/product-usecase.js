"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUsecase = void 0;
const product_1 = require("../database/entities/product");
class ProductUsecase {
    constructor(db) {
        this.db = db;
    }
    listProduct(listProductFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(listProductFilter);
            const query = this.db.createQueryBuilder(product_1.Product, 'product');
            if (listProductFilter.priceMax) {
                query.andWhere('product.price <= :priceMax', { priceMax: listProductFilter.priceMax });
            }
            query.skip((listProductFilter.page - 1) * listProductFilter.limit);
            query.take(listProductFilter.limit);
            const [products, totalCount] = yield query.getManyAndCount();
            return {
                products,
                totalCount
            };
        });
    }
    updateProduct(id_1, _a) {
        return __awaiter(this, arguments, void 0, function* (id, { price }) {
            const repo = this.db.getRepository(product_1.Product);
            const productfound = yield repo.findOneBy({ id });
            if (productfound === null)
                return null;
            if (price) {
                productfound.price = price;
            }
            const productUpdate = yield repo.save(productfound);
            return productUpdate;
        });
    }
}
exports.ProductUsecase = ProductUsecase;
