import { config } from "dotenv";
config();

import { db } from "../db";
import { categories, foods } from "../db/schema";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function seed() {
  console.log("Starting seed...");

  // Clear existing data
  await sql`DELETE FROM order_items`;
  await sql`DELETE FROM orders`;
  await sql`DELETE FROM cart_items`;
  await sql`DELETE FROM cart`;
  await sql`DELETE FROM foods`;
  await sql`DELETE FROM categories`;

  console.log("Cleared existing data");

  // Insert categories using raw SQL
  const categoryData = [
    { name: "Breakfast" },
    { name: "Main Course" },
    { name: "Snacks" },
    { name: "Pizza" },
    { name: "Chinese" },
    { name: "Desserts" },
    { name: "Beverages" },
  ];

  const insertedCategories = await Promise.all(
    categoryData.map((cat) =>
      sql`INSERT INTO categories (name) VALUES (${cat.name}) RETURNING id, name`
    )
  );

  console.log(`Inserted ${insertedCategories.length} categories`);
  console.log("Categories:", insertedCategories);

  // Extract actual category objects from nested arrays
  const categoriesFlat = insertedCategories.map((cat: any) => cat[0]);
  console.log("Flattened categories:", categoriesFlat);

  // Create category map
  const categoryMap = new Map(
    categoriesFlat.map((cat: any) => [cat.name, cat.id])
  );

  console.log("Category map:", Array.from(categoryMap.entries()));

  // Insert foods using raw SQL
  const foodData = [
    {
      categoryId: categoryMap.get("Breakfast")!,
      name: "Masala Dosa",
      description: "Crispy South Indian dosa served with sambar and chutney.",
      image: "/food-dosa.jpg",
      price: "80.00",
      rating: "4.7",
      ratingCount: 150,
      stock: 50,
      prepTime: 15,
      isVeg: true,
      isTrending: false,
      isPopular: true,
      available: true,
    },
    {
      categoryId: categoryMap.get("Snacks")!,
      name: "Veg Burger",
      description: "Loaded burger with fresh veggies and cheese.",
      image: "/hero-food.jpg",
      price: "120.00",
      rating: "4.5",
      ratingCount: 200,
      stock: 40,
      prepTime: 10,
      isVeg: true,
      isTrending: true,
      isPopular: true,
      available: true,
    },
    {
      categoryId: categoryMap.get("Snacks")!,
      name: "Momos",
      description: "Spicy filling with thin layer.",
      image: "/momos.jpg",
      price: "80.00",
      rating: "4.6",
      ratingCount: 180,
      stock: 60,
      prepTime: 12,
      isVeg: true,
      isTrending: true,
      isPopular: false,
      available: true,
    },
    {
      categoryId: categoryMap.get("Chinese")!,
      name: "Veg Chowmein",
      description: "Street-style noodles tossed with vegetables.",
      image: "/food-noodles.jpg",
      price: "90.00",
      rating: "4.4",
      ratingCount: 120,
      stock: 45,
      prepTime: 15,
      isVeg: true,
      isTrending: false,
      isPopular: false,
      available: true,
    },
    {
      categoryId: categoryMap.get("Pizza")!,
      name: "Margherita Pizza",
      description: "Classic pizza topped with mozzarella cheese.",
      image: "/food-pizza.jpg",
      price: "180.00",
      rating: "4.8",
      ratingCount: 250,
      stock: 30,
      prepTime: 20,
      isVeg: true,
      isTrending: true,
      isPopular: true,
      available: true,
    },
    {
      categoryId: categoryMap.get("Beverages")!,
      name: "Cold Coffee",
      description: "Chilled coffee blended with ice cream.",
      image: "/cold-coffee.jpg",
      price: "70.00",
      rating: "4.5",
      ratingCount: 160,
      stock: 80,
      prepTime: 5,
      isVeg: true,
      isTrending: false,
      isPopular: false,
      available: true,
    },
    {
      categoryId: categoryMap.get("Beverages")!,
      name: "Masala Chai",
      description: "Hot tea brewed with aromatic Indian spices.",
      image: "/chai.jpg",
      price: "20.00",
      rating: "4.9",
      ratingCount: 300,
      stock: 100,
      prepTime: 3,
      isVeg: true,
      isTrending: true,
      isPopular: true,
      available: true,
    },
    {
      categoryId: categoryMap.get("Main Course")!,
      name: "Paneer Butter Masala",
      description: "Rich and creamy paneer curry served with naan.",
      image: "/paneer-butter-masala.jpg",
      price: "170.00",
      rating: "4.8",
      ratingCount: 220,
      stock: 35,
      prepTime: 25,
      isVeg: true,
      isTrending: false,
      isPopular: true,
      available: true,
    },
    {
      categoryId: categoryMap.get("Chinese")!,
      name: "Veg Fried Rice",
      description: "Flavorful rice stir-fried with vegetables.",
      image: "/veg-fried-rice.jpg",
      price: "100.00",
      rating: "4.4",
      ratingCount: 140,
      stock: 50,
      prepTime: 15,
      isVeg: true,
      isTrending: false,
      isPopular: false,
      available: true,
    },
    {
      categoryId: categoryMap.get("Snacks")!,
      name: "Samosa",
      description: "Crispy fried pastry stuffed with spiced potatoes.",
      image: "/samosa.jpg",
      price: "15.00",
      rating: "4.6",
      ratingCount: 280,
      stock: 100,
      prepTime: 5,
      isVeg: true,
      isTrending: false,
      isPopular: true,
      available: true,
    },
    {
      categoryId: categoryMap.get("Desserts")!,
      name: "Ice-Cream",
      description: "Rich, creamy, and chilled ice cream topped with happiness in every scoop.",
      image: "/ice-cream.jpg",
      price: "50.00",
      rating: "4.6",
      ratingCount: 190,
      stock: 70,
      prepTime: 2,
      isVeg: true,
      isTrending: true,
      isPopular: false,
      available: true,
    },
    {
      categoryId: categoryMap.get("Main Course")!,
      name: "Chhole Bhature",
      description: "Mini fluffy bhature paired with spicy chole for a perfect quick bite.",
      price: "60.00",
      rating: "4.6",
      ratingCount: 170,
      stock: 40,
      prepTime: 15,
      isVeg: true,
      isTrending: false,
      isPopular: false,
      available: true,
      image: "/chhole.jpg",
    },
  ];

  const insertedFoods = await Promise.all(
    foodData.map((food) =>
      sql`INSERT INTO foods (category_id, name, description, image, price, rating, rating_count, stock, prep_time, is_veg, is_trending, is_popular, available) 
          VALUES (${food.categoryId}, ${food.name}, ${food.description}, ${food.image}, ${food.price}, ${food.rating}, ${food.ratingCount}, ${food.stock}, ${food.prepTime}, ${food.isVeg}, ${food.isTrending}, ${food.isPopular}, ${food.available}) RETURNING *`
    )
  );

  console.log(`Inserted ${insertedFoods.length} foods`);
  console.log("Seed completed successfully!");
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
