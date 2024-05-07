import { CartRepository } from '../Repositories/cart.repository.js'

export class CartController {
    static instance
    constructor() {
        this.repository = new CartRepository();
    }

    getCart = async (req, res) => {
        const allProducts = await this.repository.getCart();
        return res.json(allProducts);
    }

    // getProduct = async (req, res) => {
    //     const id = Number(req.params.id);
    //     const product = await this.repository.(id);
    //     return res.json(product);
    // }

    createCart = async (req, res) => {
        const product = req.body;

        const createdProduct = await this.repository.createCart(product);

        return res.json(createdProduct);
    }

    updateCart = async (req, res) => {
        const id = Number(req.params.id);
        const prod = req.body;

        const prodUpdated = await this.repository.updateCart({ id, ...prod });

        return res.json(prodUpdated);
    }

    deleteCart = async (req, res) => {
        const id = Number(req.params.id);
    
        await this.repository.deleteCart(id);

        return res.json({ ok: true });
    }
}