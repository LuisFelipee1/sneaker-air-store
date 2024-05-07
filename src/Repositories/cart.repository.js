import { PrismaClient } from "@prisma/client";

export class CartRepository {
    // users = [];
    prisma;

    constructor() {
        this.prisma = new PrismaClient()
    }

    async createCart({ name, description, price, imageUrl }) {
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

    async getCart() {
        const prod = await this.prisma.product.findMany();
        return prod;
    }

    async updateCart({ id, name, description, price, imageUrl }) {
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

    async deleteCart(id) {
        await this.prisma.product.delete({ where: { id } })
    }
}