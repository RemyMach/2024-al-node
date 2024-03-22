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
exports.initRoutes = void 0;
const product_validator_1 = require("./validators/product-validator");
const generate_validation_message_1 = require("./validators/generate-validation-message");
const database_1 = require("../database/database");
const product_1 = require("../database/entities/product");
const product_usecase_1 = require("../domain/product-usecase");
const user_1 = require("./user");
const auth_middleware_1 = require("./middleware/auth-middleware");
const invalid_path_handler_1 = require("./errors/invalid-path-handler");
const initRoutes = (app) => {
    app.get("/health", (req, res) => {
        res.send({ "message": "hello world" });
    });
    /**
    * @openapi
    * '/products':
    *  post:
    *     tags:
    *     - Products
    *     summary: Create a new product
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/CreateProduct'
    *     responses:
    *       200:
    *         description: Product created
    *         content:
    *          application/json:
    *           schema:
    *              $ref: '#/components/schemas/Product'
    *           example:
    *             "id": "10"
    *             "name": "Courgette"
    *             "description": "product description"
    *             "price": 879
    *             "createdAt": "2023-04-03T00:25:32.189Z"
    *       500:
    *         description: Internal Error
    *         content:
    *          application/json:
    *            schema:
    *              type: object
    *              properties:
    *                error:
    *                  type: string
    *                  description: error message
    *              example:
    *                error: 'Internal error'
    */
    app.post("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const validation = product_validator_1.productValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send((0, generate_validation_message_1.generateValidationErrorMessage)(validation.error.details));
            return;
        }
        const productRequest = validation.value;
        const productRepo = database_1.AppDataSource.getRepository(product_1.Product);
        try {
            const productCreated = yield productRepo.save(productRequest);
            res.status(201).send(productCreated);
        }
        catch (error) {
            res.status(500).send({ error: "Internal error" });
        }
    }));
    app.get("/products", auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const validation = product_validator_1.listProductValidation.validate(req.query);
        if (validation.error) {
            res.status(400).send((0, generate_validation_message_1.generateValidationErrorMessage)(validation.error.details));
            return;
        }
        const listProductRequest = validation.value;
        let limit = 20;
        if (listProductRequest.limit) {
            limit = listProductRequest.limit;
        }
        const page = (_a = listProductRequest.page) !== null && _a !== void 0 ? _a : 1;
        try {
            const productUsecase = new product_usecase_1.ProductUsecase(database_1.AppDataSource);
            const listProducts = yield productUsecase.listProduct(Object.assign(Object.assign({}, listProductRequest), { page, limit }));
            res.status(200).send(listProducts);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    }));
    app.patch("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const validation = product_validator_1.updateProductValidation.validate(Object.assign(Object.assign({}, req.params), req.body));
        if (validation.error) {
            res.status(400).send((0, generate_validation_message_1.generateValidationErrorMessage)(validation.error.details));
            return;
        }
        const updateProductRequest = validation.value;
        try {
            const productUsecase = new product_usecase_1.ProductUsecase(database_1.AppDataSource);
            const updatedProduct = yield productUsecase.updateProduct(updateProductRequest.id, Object.assign({}, updateProductRequest));
            if (updatedProduct === null) {
                res.status(404).send({ "error": `product ${updateProductRequest.id} not found` });
                return;
            }
            res.status(200).send(updatedProduct);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    }));
    app.get("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const validationResult = product_validator_1.productIdValidation.validate(req.params);
            if (validationResult.error) {
                res.status(400).send((0, generate_validation_message_1.generateValidationErrorMessage)(validationResult.error.details));
                return;
            }
            const productId = validationResult.value;
            const productRepository = database_1.AppDataSource.getRepository(product_1.Product);
            const product = yield productRepository.findOneBy({ id: productId.id });
            if (product === null) {
                res.status(404).send({ "error": `product ${productId.id} not found` });
                return;
            }
            res.status(200).send(product);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    }));
    app.delete("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const validationResult = product_validator_1.productIdValidation.validate(req.params);
            if (validationResult.error) {
                res.status(400).send((0, generate_validation_message_1.generateValidationErrorMessage)(validationResult.error.details));
                return;
            }
            const productId = validationResult.value;
            const productRepository = database_1.AppDataSource.getRepository(product_1.Product);
            const product = yield productRepository.findOneBy({ id: productId.id });
            if (product === null) {
                res.status(404).send({ "error": `product ${productId.id} not found` });
                return;
            }
            const productDeleted = yield productRepository.remove(product);
            res.status(200).send(productDeleted);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    }));
    (0, user_1.UserHandler)(app);
    app.use(invalid_path_handler_1.invalidPathHandler);
};
exports.initRoutes = initRoutes;
