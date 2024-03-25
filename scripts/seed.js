const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const database = new PrismaClient();

async function main() {
  try {
    const categories = [
      {
        name: "Electronics",
        subcategories: [
          "Smartphones",
          "Laptops",
          "Tablets",
          "Cameras",
          "Smartwatches",
          "Headphones",
          "Gaming Consoles",
        ],
      },
      {
        name: "Music",
        subcategories: ["Instruments", "Recordings", "Accessories"],
      },
      {
        name: "Fitness",
        subcategories: ["Gym Equipment", "Fitness Clothing", "Supplements"],
      },
      {
        name: "Groceries",
        subcategories: [
          "Fruits",
          "Vegetables",
          "Dairy",
          "Meat",
          "Bakery",
          "Canned Goods",
          "Snacks",
        ],
      },
      {
        name: "Gaming",
        subcategories: [
          "Video Games",
          "Gaming Accessories",
          "Gaming Consoles",
          "Gaming Merchandise",
        ],
      },
      {
        name: "Fashion",
        subcategories: [
          "Clothing",
          "Shoes",
          "Accessories",
          "Bags",
          "Jewelry",
          "Watches",
        ],
      },
      {
        name: "DIY",
        subcategories: [
          "Tools",
          "Home Improvement",
          "Craft Supplies",
          "DIY Kits",
          "Paints and Finishes",
        ],
      },
      {
        name: "Beauty",
        subcategories: [
          "Skincare",
          "Makeup",
          "Haircare",
          "Fragrances",
          "Personal Care",
        ],
      },
      {
        name: "Sports",
        subcategories: [
          "Sportswear",
          "Equipment",
          "Accessories",
          "Fitness Trackers",
          "Team Sports Gear",
        ],
      },
      {
        name: "Travel",
        subcategories: [
          "Luggage",
          "Travel Accessories",
          "Travel Tech",
          "Travel Essentials",
          "Outdoor Gear",
        ],
      },
    ];

    const createdCategories = [];
    for (const category of categories) {
      const createdCategory = await database.category.upsert({
        where: { name: category.name },
        update: {},
        create: { name: category.name },
      });

      // Create subcategories
      if (category.subcategories && category.subcategories.length > 0) {
        for (const subcategoryName of category.subcategories) {
          const createdSubcategory = await database.category.upsert({
            where: { name: subcategoryName },
            update: {},
            create: { name: subcategoryName, parentId: createdCategory.id },
          });
          createdCategories.push(createdSubcategory);
        }
      } else {
        createdCategories.push(createdCategory);
      }
    }

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
