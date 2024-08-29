import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    await prisma.user.upsert({
        where: {
            email: "luis@gmail.com"
        },
        create: {
            name: "Luis Felipe",
            email: "luis@gmail.com",
            password: "123456",
            admin: true,
        },
        update: {},
    })

    await prisma.product.upsert({
        where: {
            id: 1
        },
        update: {},
        create: {
            name: "jordan 3 smokey grey",
            description: "tenis confortavel",
            price: 100,
            imageUrl: 'https://images.solecollector.com/complex/images/c_crop,h_1033,w_1939,x_34,y_595/c_fill,dpr_2.0,f_auto,fl_lossy,q_auto,w_800/skhnvcczrz6sv5ierxow/air-jordan-3-retro-cool-grey-2021-ct8532-012-pair'
        }
    })
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})