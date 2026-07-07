require("dotenv").config();
const { db } = require("../db");
const { categories, foods } = require("../db/schema");
const { neon } = require("@neondatabase/serverless");
const { menuData } = require("../data/menu");

const sql = neon(process.env.DATABASE_URL!);

async function seed() {
  console.log("Starting seed...");

  // Run migrations/alter if needed
  try {
    await sql`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "daily_order_id" integer`;
    console.log("Migration applied successfully for orders.daily_order_id");
  } catch (error) {
    console.log("Migration may already exist or failed:", error);
  }

  try {
    await sql`ALTER TABLE "order_items" ADD COLUMN IF NOT EXISTS "created_at" timestamp DEFAULT now() NOT NULL`;
    console.log("Migration applied successfully for order_items.created_at");
  } catch (error) {
    console.log("Migration may already exist or failed:", error);
  }

  // Clear existing data
  await sql`DELETE FROM order_items`;
  await sql`DELETE FROM orders`;
  await sql`DELETE FROM cart_items`;
  await sql`DELETE FROM cart`;
  await sql`DELETE FROM foods`;
  await sql`DELETE FROM categories`;

  console.log("Cleared existing data");

  // Get unique categories from menuData
  const categoryNames = menuData.map((cat: any) => cat.category);
  console.log("Inserting categories:", categoryNames);

  // Insert categories and build a map of categoryName -> categoryId
  const categoryMap = new Map<string, string>();
  for (const name of categoryNames) {
    const [insertedCat] = await db
      .insert(categories)
      .values({ name })
      .returning();
    categoryMap.set(name, insertedCat.id);
  }

  console.log("Categories inserted successfully!");

  // Insert foods from menuData
  let foodCount = 0;
  for (const catData of menuData) {
    const categoryId = categoryMap.get(catData.category);
    if (!categoryId) continue;

    for (const item of catData.items) {
      if (item.price === null) continue; // Skip items without price

      // Parse preparation time to integer minutes (e.g. "10-15 min" -> 15, "5 min" -> 5)
      let prepTime = 10;
      if (item.preparationTime) {
        const matches = item.preparationTime.match(/(\d+)/g);
        if (matches && matches.length > 0) {
          prepTime = parseInt(matches[matches.length - 1]); // Use max time
        }
      }

      await db.insert(foods).values({
        categoryId,
        name: item.name,
        description: item.description || `Fresh and delicious ${item.name}`,
        image: item.image || "/hero-food.jpg",
        price: item.price.toString(),
        rating: item.rating ? item.rating.toString() : "0.0",
        ratingCount: Math.floor(Math.random() * 200) + 10,
        stock: 100,
        prepTime,
        isVeg: item.veg,
        isTrending: Math.random() > 0.8, // Mark some random items as trending
        isPopular: item.popular || false,
        available: true,
      });
      foodCount++;
    }
  }

  console.log(`Successfully seeded ${foodCount} foods!`);
  console.log("Seed completed successfully!");
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
