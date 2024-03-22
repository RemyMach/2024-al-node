/**
    * @openapi
    * components:
    *   schemas:
    *     Product:
    *       type: object
    *       properties:
    *         id:
    *           type: string
    *           description: L'identifiant unique du produit
    *         name:
    *           type: string
    *           description: Le nom du produit
    *         price:
    *           type: number
    *           description: Le prix du produit
    *       example:
    *         id: '1'
    *         name: Exemple de produit
    *         price: 19.99
    *     ProductsArray:
    *       type: array
    *       items:
    *         $ref: '#/components/schemas/Product'
    */
export interface ProductResponse {
    id: number,
    name: string
    price: number
}