import express, { Request, Response } from "express";
import { ProductRequest, productValidation } from "./validators/product-validator";
import { generateValidationErrorMessage } from "./validators/generate-validation-message";
import { AppDataSource } from "../database/database";
import { ProductDB } from "../database/entities/product";

export const initRoutes = (app: express.Express) => {
    app.get("/health", (req: Request, res: Response) => {
        res.send({ "message": "hello world" })
    })

    app.post("/products", async (req: Request, res: Response) => {
        const { error, value } = productValidation.validate(req.body)

        if (error) {
            res.status(400).send(generateValidationErrorMessage(error.details))
            return
        }

        const productRequest = value as ProductRequest
        const productRepo = AppDataSource.getRepository(ProductDB)
        try {

            const productCreated = await productRepo.save({
                ...productRequest
            })
            res.status(201).send(productCreated)
        } catch (error) {
            res.status(500).send({ error: "Internal error" })
        }
    })

    app.get("/products", async (req: Request, res: Response) => {

        const productRepo = AppDataSource.getRepository(ProductDB)
        try {
            const products = await productRepo.find()
            res.status(200).send(products)
        } catch (error) {
            res.status(500).send({ error: "Internal error" })
        }
    })
}