import { ProductsRepository } from '../Repositories/products.repository.js'

export class ProductsController {
    static instance
    constructor() {
        this.repository = new ProductsRepository();
    }

    getProducts = async (req, res) => {
        const allProducts = await this.repository.getProducts();
        return res.json(allProducts);
    }

    getProduct = async (req, res) => {
        const id = Number(req.params.id);
        const product = await this.repository.getProduct(id);
        return res.json(product);
    }

    createProduct = async (req, res) => {
        const product = req.body;

        const createdProduct = await this.repository.createProduct(product);

        return res.json(createdProduct);
    }

    updateProduct = async (req, res) => {
        const id = Number(req.params.id);
        const prod = req.body;

        const prodUpdated = await this.repository.updateProducts({ id, ...prod });

        return res.json(prodUpdated);
    }

    deleteProduct = async (req, res) => {
        const id = Number(req.params.id);
    
        await this.repository.deleteProduct(id);

        return res.json({ ok: true });
    }
}