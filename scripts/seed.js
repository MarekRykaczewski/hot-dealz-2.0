const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const database = new PrismaClient();

async function main() {
  try {
    const categories = [
      { name: "Electronics" },
      { name: "Music" },
      { name: "Fitness" },
      { name: "Groceries" },
      { name: "Gaming" },
      { name: "Fashion" },
      { name: "DIY" },
      { name: "Beauty" },
      { name: "Sports" },
      { name: "Travel" },
    ];

    const createdCategories = await Promise.all(
      categories.map((category) =>
        database.category.upsert({
          where: { name: category.name },
          update: {},
          create: category,
        })
      )
    );

    const deals = Array.from({ length: 10 }, () => {
      const randomCategory =
        createdCategories[Math.floor(Math.random() * createdCategories.length)];
      return {
        userId: faker.datatype.uuid(),
        title: faker.commerce.productName(),
        link: faker.internet.url(),
        description: faker.lorem.sentence(),
        score: faker.datatype.number({ min: 1, max: 100 }),
        isPublished: true,
        imageUrls: [faker.image.imageUrl()],
        categoryId: randomCategory.id,
        startDate: faker.date.between(new Date(), new Date("2025-12-31")),
        endDate: faker.date.between(new Date(), new Date("2025-12-31")),
        price: parseFloat(faker.commerce.price()),
        nextBestPrice: parseFloat(faker.commerce.price()),
        shippingPrice: parseFloat(faker.commerce.price()),
      };
    });

    await database.deal.createMany({
      data: deals,
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database", error);
  } finally {
    await database.$disconnect();
  }
}

main();
