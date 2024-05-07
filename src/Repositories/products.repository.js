import { PrismaClient } from "@prisma/client";

export class ProductsRepository {
    // users = [];
    prisma;

    constructor() {
        this.prisma = new PrismaClient()
    }

    async createProduct({ name, description, price, imageUrl }) {
        const product = await this.prisma.product.create({
            data: {
                name,
                description,
                price,
                imageUrl,
            }
        });

        return product;
    }

    async getProducts() {
        const prod = await this.prisma.product.findMany();
        return prod;
    }

    async getProduct(id) {
        const prod = await this.prisma.product.findUnique({ where: { id } });
        return prod;
    }

    async updateProducts({ id, name, description, price, imageUrl }) {
        const prod = await this.prisma.product.update({
            where: {
                id: Number(id),
            },
            data: {
                name,
                description,
                price: Number(price),
                imageUrl,
            }
        })

        return prod
    }

    async deleteProduct(id) {
        await this.prisma.product.delete({ where: { id } })
    }
}