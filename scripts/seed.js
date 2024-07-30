const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const database = new PrismaClient();

const CATEGORIES = [
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

async function main() {
  // Parse command-line arguments
  const args = process.argv.slice(2);
  const numUsers = parseInt(args[0], 10) || 5;
  const numDeals = parseInt(args[1], 10) || 10;
  const numReactions = parseInt(args[2], 10) || 20;

  try {
    // 1. Create Users
    const userCreationResults = await database.user.createMany({
      data: Array.from({ length: numUsers }, () => ({
        clerkId: faker.datatype.uuid(),
        username: faker.internet.userName(),
      })),
    });

    const allUsers = await database.user.findMany();
    const clerkIds = allUsers.map((user) => user.clerkId);
    const userIds = allUsers.map((user) => user.id);

    // 2. Create Categories and Subcategories
    const createdCategories = [];
    for (const category of CATEGORIES) {
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

    // 3. Create Deals
    const deals = Array.from({ length: numDeals }, () => {
      const randomCategory =
        createdCategories[Math.floor(Math.random() * createdCategories.length)];

      const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];

      return {
        userId: allUsers.find((user) => user.id === randomUserId)?.clerkId, // Ensure userId is valid
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

    // 4. Create Comments and Replies
    const dealIds = await database.deal
      .findMany({ select: { id: true } })
      .then((deals) => deals.map((deal) => deal.id));

    for (const dealId of dealIds) {
      // Create comments
      const comments = Array.from(
        { length: faker.datatype.number({ min: 4, max: 7 }) },
        () => ({
          userId: clerkIds[Math.floor(Math.random() * clerkIds.length)],
          dealId: dealId,
          content: faker.lorem.sentence(),
        })
      );

      await database.comment.createMany({
        data: comments,
      });

      // Create replies for each comment
      const commentIds = await database.comment
        .findMany({ where: { dealId: dealId }, select: { id: true } })
        .then((comments) => comments.map((comment) => comment.id));

      for (const commentId of commentIds) {
        const replies = Array.from(
          { length: faker.datatype.number({ min: 0, max: 3 }) },
          () => ({
            userId: clerkIds[Math.floor(Math.random() * clerkIds.length)],
            dealId: dealId,
            content: faker.lorem.sentence(),
            parentId: commentId,
          })
        );

        await database.comment.createMany({
          data: replies,
        });
      }
    }

    // 5. Create Comment Reactions
    const commentIds = await database.comment
      .findMany({ select: { id: true } })
      .then((comments) => comments.map((comment) => comment.id));

    const reactions = Array.from({ length: numReactions }, () => {
      return {
        userId: clerkIds[Math.floor(Math.random() * clerkIds.length)],
        commentId: commentIds[Math.floor(Math.random() * commentIds.length)],
        reaction: ["like", "funny", "helpful"][Math.floor(Math.random() * 3)],
      };
    });

    await database.commentReaction.createMany({
      data: reactions,
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database", error);
  } finally {
    await database.$disconnect();
  }
}

main();
