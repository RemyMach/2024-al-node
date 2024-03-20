import express, { Request, Response } from "express";
import { productValidation } from "./validators/product-validator";
import { generateValidationErrorMessage } from "./validators/generate-validation-message";

export const initRoutes = (app: express.Express) => {
    app.get("/health", (req: Request, res: Response) => {
        res.send({ "message": "hello world" })
    })

    app.post("/products", (req: Request, res: Response) => {
        const { error, value } = productValidation.validate(req.body)
        
        if (error) {
            res.status(400).send(generateValidationErrorMessage(error.details))
            return
        }
        res.send({})
    })
}