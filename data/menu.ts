import { MenuData } from '@/types/menu';

export const menuData: MenuData = [
  {
    category: "Snacks",
    items: [
      { id: "snack-1", name: "Samosa", price: 14, veg: true, rating: 4.5, preparationTime: "10-15 min", description: "Crispy fried pastry with spiced potato filling" },
      { id: "snack-2", name: "Bread Pakora", price: 15, veg: true, rating: 4.3, preparationTime: "10-15 min", description: "Bread slices dipped in gram flour batter and deep fried" },
      { id: "snack-3", name: "Aloo Patties", price: 25, veg: true, rating: 4.4, preparationTime: "15-20 min", description: "Potato filled pastry patties" },
      { id: "snack-4", name: "Paneer Patties", price: 30, veg: true, rating: 4.6, preparationTime: "15-20 min", description: "Cottage cheese filled pastry patties" },
      { id: "snack-5", name: "Pizza Patties", price: 35, veg: true, rating: 4.5, preparationTime: "15-20 min", description: "Pizza flavored patties with cheese" },
      { id: "snack-6", name: "Bread Roll", price: 15, veg: true, rating: 4.2, preparationTime: "10-15 min", description: "Spiced potato rolled in bread and fried" },
      { id: "snack-7", name: "Bread Omelet", price: 55, veg: false, rating: 4.4, preparationTime: "10-15 min", description: "Bread with egg omelet" }
    ]
  },
  {
    category: "Maggi",
    items: [
      { id: "maggi-1", name: "Plain Maggi", price: 30, veg: true, rating: 4.3, preparationTime: "8-10 min", description: "Classic instant noodles" },
      { id: "maggi-2", name: "Veg Maggi", price: 40, veg: true, rating: 4.5, preparationTime: "10-12 min", description: "Noodles with mixed vegetables" },
      { id: "maggi-3", name: "Egg Maggi", price: 50, veg: false, rating: 4.6, preparationTime: "10-12 min", description: "Noodles with egg" }
    ]
  },
  {
    category: "Momos",
    items: [
      { id: "momo-1", name: "Veg Steam Momos", price: 50, veg: true, rating: 4.5, preparationTime: "15-20 min", description: "Steamed vegetable dumplings" },
      { id: "momo-2", name: "Veg Fried Momos", price: 60, veg: true, rating: 4.6, preparationTime: "15-20 min", description: "Fried vegetable dumplings" },
      { id: "momo-3", name: "Paneer Steam Momos", price: 70, veg: true, rating: 4.7, preparationTime: "15-20 min", description: "Steamed cottage cheese dumplings" },
      { id: "momo-4", name: "Paneer Fried Momos", price: 80, veg: true, rating: 4.8, preparationTime: "15-20 min", description: "Fried cottage cheese dumplings" }
    ]
  },
  {
    category: "Rolls",
    items: [
      { id: "roll-1", name: "Veg Roll", price: 50, veg: true, rating: 4.4, preparationTime: "10-15 min", description: "Vegetable wrapped in paratha" },
      { id: "roll-2", name: "Paneer Roll", price: 60, veg: true, rating: 4.6, preparationTime: "10-15 min", description: "Cottage cheese wrapped in paratha" },
      { id: "roll-3", name: "Egg Roll", price: 60, veg: false, rating: 4.5, preparationTime: "10-15 min", description: "Egg wrapped in paratha" },
      { id: "roll-4", name: "Egg Paneer Roll", price: 70, veg: false, rating: 4.7, preparationTime: "10-15 min", description: "Egg and cottage cheese roll" },
      { id: "roll-5", name: "Double Egg Roll", price: 70, veg: false, rating: 4.6, preparationTime: "10-15 min", description: "Double egg wrapped in paratha" },
      { id: "roll-6", name: "Double Egg Paneer Roll", price: 80, veg: false, rating: 4.8, preparationTime: "10-15 min", description: "Double egg with cottage cheese" }
    ]
  },
  {
    category: "Hot Dog",
    items: [
      { id: "hotdog-1", name: "Veg Hot Dog", price: 50, veg: true, rating: 4.3, preparationTime: "8-10 min", description: "Vegetarian hot dog with toppings" },
      { id: "hotdog-2", name: "Paneer Hot Dog", price: 60, veg: true, rating: 4.5, preparationTime: "8-10 min", description: "Cottage cheese hot dog" }
    ]
  },
  {
    category: "Chinese",
    items: [
      { id: "chinese-1", name: "Veg Chowmein", price: 55, veg: true, rating: 4.6, preparationTime: "15-20 min", description: "Stir-fried vegetable noodles" },
      { id: "chinese-2", name: "Egg Chowmein", price: 80, veg: false, rating: 4.7, preparationTime: "15-20 min", description: "Noodles with egg" },
      { id: "chinese-3", name: "Egg Tomato Cheese Chowmein", price: 85, veg: false, rating: 4.8, preparationTime: "15-20 min", description: "Noodles with egg, tomato and cheese" },
      { id: "chinese-4", name: "Tomato Cheese Chowmein", price: 80, veg: true, rating: 4.7, preparationTime: "15-20 min", description: "Noodles with tomato and cheese" },
      { id: "chinese-5", name: "Garlic Chowmein", price: 70, veg: true, rating: 4.5, preparationTime: "15-20 min", description: "Garlic flavored noodles" },
      { id: "chinese-6", name: "Chilli Potato", price: 75, veg: true, rating: 4.6, preparationTime: "15-20 min", description: "Spicy potato fingers" },
      { id: "chinese-7", name: "Chilli Paneer", price: 100, veg: true, rating: 4.8, preparationTime: "15-20 min", description: "Spicy cottage cheese cubes" },
      { id: "chinese-8", name: "Red Sauce Pasta", price: 60, veg: true, rating: 4.4, preparationTime: "12-15 min", description: "Pasta in tomato sauce" },
      { id: "chinese-9", name: "White Sauce Pasta", price: 80, veg: true, rating: 4.6, preparationTime: "12-15 min", description: "Pasta in creamy white sauce" }
    ]
  },
  {
    category: "French Fries",
    items: [
      { id: "fries-1", name: "Smiles", price: 60, veg: true, rating: 4.5, preparationTime: "10-12 min", description: "Smile shaped potato bites" },
      { id: "fries-2", name: "French Fries", price: 50, veg: true, rating: 4.4, preparationTime: "10-12 min", description: "Classic crispy french fries" },
      { id: "fries-3", name: "Veg Nuggets", price: 60, veg: true, rating: 4.5, preparationTime: "10-12 min", description: "Vegetable nuggets" },
      { id: "fries-4", name: "Veg Fingers", price: 60, veg: true, rating: 4.4, preparationTime: "10-12 min", description: "Vegetable fingers" },
      { id: "fries-5", name: "Masala Fries", price: 60, veg: true, rating: 4.6, preparationTime: "10-12 min", description: "Spiced french fries" }
    ]
  },
  {
    category: "Burger",
    items: [
      { id: "burger-1", name: "Veg Burger", price: 40, veg: true, rating: 4.3, preparationTime: "8-10 min", description: "Classic vegetable burger" },
      { id: "burger-2", name: "Cheese Burger", price: 50, veg: true, rating: 4.5, preparationTime: "8-10 min", description: "Burger with cheese slice" },
      { id: "burger-3", name: "Maccan Burger", price: 55, veg: true, rating: 4.4, preparationTime: "8-10 min", description: "Special vegetable patty burger" },
      { id: "burger-4", name: "Maccan Cheese Burger", price: 70, veg: true, rating: 4.6, preparationTime: "8-10 min", description: "Cheese burger with special patty" },
      { id: "burger-5", name: "Paneer Cheese Tikki Burger", price: 70, veg: true, rating: 4.7, preparationTime: "10-12 min", description: "Paneer tikki with cheese" },
      { id: "burger-6", name: "Tandoori Veg Patty Burger", price: 50, veg: true, rating: 4.5, preparationTime: "10-12 min", description: "Tandoori flavored veg patty" },
      { id: "burger-7", name: "Tandoori Veg Cheese Patty Burger", price: 60, veg: true, rating: 4.6, preparationTime: "10-12 min", description: "Tandoori patty with cheese" },
      { id: "burger-8", name: "Peri Peri Veg Grilled Burger", price: 50, veg: true, rating: 4.5, preparationTime: "10-12 min", description: "Peri peri spiced grilled burger" },
      { id: "burger-9", name: "Peri Peri Veg Cheese Grilled Burger", price: 70, veg: true, rating: 4.7, preparationTime: "10-12 min", description: "Peri peri with cheese" }
    ]
  },
  {
    category: "Pizza",
    items: [
      { id: "pizza-1", name: "Cheese Pizza", price: 150, veg: true, rating: 4.6, preparationTime: "20-25 min", description: "Pizza loaded with cheese" },
      { id: "pizza-2", name: "Onion Pizza", price: 150, veg: true, rating: 4.5, preparationTime: "20-25 min", description: "Pizza with onion topping" },
      { id: "pizza-3", name: "Onion Capsicum Pizza", price: 150, veg: true, rating: 4.6, preparationTime: "20-25 min", description: "Pizza with onion and capsicum" },
      { id: "pizza-4", name: "Mix Pizza", price: 150, veg: true, rating: 4.7, preparationTime: "20-25 min", description: "Pizza with mixed vegetable toppings" }
    ]
  },
  {
    category: "Sandwich",
    items: [
      { id: "sandwich-1", name: "Veg Sandwich", price: 30, veg: true, rating: 4.3, preparationTime: "5-8 min", description: "Simple vegetable sandwich" },
      { id: "sandwich-2", name: "Cheese Sandwich", price: 50, veg: true, rating: 4.5, preparationTime: "5-8 min", description: "Sandwich with cheese" },
      { id: "sandwich-3", name: "Sweet Corn Sandwich", price: 50, veg: true, rating: 4.6, preparationTime: "5-8 min", description: "Sweet corn filled sandwich" },
      { id: "sandwich-4", name: "Grilled Sandwich", price: 40, veg: true, rating: 4.4, preparationTime: "8-10 min", description: "Grilled vegetable sandwich" },
      { id: "sandwich-5", name: "Cheese Grilled Sandwich", price: 50, veg: true, rating: 4.6, preparationTime: "8-10 min", description: "Grilled cheese sandwich" },
      { id: "sandwich-6", name: "Paneer Grilled Sandwich", price: 60, veg: true, rating: 4.7, preparationTime: "8-10 min", description: "Grilled paneer sandwich" },
      { id: "sandwich-7", name: "Paneer Cheese Grilled Sandwich", price: 70, veg: true, rating: 4.8, preparationTime: "8-10 min", description: "Paneer with cheese grilled" },
      { id: "sandwich-8", name: "Grilled Pizza Cheese Sandwich", price: 70, veg: true, rating: 4.7, preparationTime: "8-10 min", description: "Pizza style grilled sandwich" },
      { id: "sandwich-9", name: "Grilled Cheese Corn Pizza Sandwich", price: 80, veg: true, rating: 4.8, preparationTime: "8-10 min", description: "Cheese corn grilled sandwich" },
      { id: "sandwich-10", name: "Tandoori Sandwich", price: 40, veg: true, rating: 4.5, preparationTime: "8-10 min", description: "Tandoori flavored sandwich" },
      { id: "sandwich-11", name: "Tandoori Grilled Sandwich", price: 50, veg: true, rating: 4.6, preparationTime: "8-10 min", description: "Grilled tandoori sandwich" },
      { id: "sandwich-12", name: "Tandoori Cheese Grilled Sandwich", price: 60, veg: true, rating: 4.7, preparationTime: "8-10 min", description: "Tandoori with cheese grilled" },
      { id: "sandwich-13", name: "Tandoori Cheese Paneer Sandwich", price: 70, veg: true, rating: 4.8, preparationTime: "8-10 min", description: "Tandoori paneer cheese sandwich" },
      { id: "sandwich-14", name: "Peri Peri Veg Sandwich", price: 40, veg: true, rating: 4.5, preparationTime: "8-10 min", description: "Peri peri vegetable sandwich" },
      { id: "sandwich-15", name: "Peri Peri Cheese Sandwich", price: 50, veg: true, rating: 4.6, preparationTime: "8-10 min", description: "Peri peri cheese sandwich" }
    ]
  },
  {
    category: "Uttapam",
    items: [
      { id: "uttapam-1", name: "Veg Uttapam", price: 70, veg: true, rating: 4.5, preparationTime: "15-20 min", description: "Thick pancake with vegetables" },
      { id: "uttapam-2", name: "Plain Uttapam", price: 60, veg: true, rating: 4.3, preparationTime: "15-20 min", description: "Plain thick pancake" },
      { id: "uttapam-3", name: "Onion Uttapam", price: 70, veg: true, rating: 4.5, preparationTime: "15-20 min", description: "Uttapam with onion topping" },
      { id: "uttapam-4", name: "Tomato Onion Uttapam", price: 80, veg: true, rating: 4.6, preparationTime: "15-20 min", description: "Uttapam with tomato and onion" },
      { id: "uttapam-5", name: "Five Taste Uttapam", price: 90, veg: true, rating: 4.7, preparationTime: "15-20 min", description: "Uttapam with five different toppings" }
    ]
  },
  {
    category: "Shakes",
    items: [
      { id: "shake-1", name: "Banana Shake", price: 60, veg: true, rating: 4.5, preparationTime: "5-8 min", description: "Fresh banana milkshake" },
      { id: "shake-2", name: "Cold Coffee", price: 50, veg: true, rating: 4.4, preparationTime: "5-8 min", description: "Iced coffee" },
      { id: "shake-3", name: "KitKat Shake", price: 60, veg: true, rating: 4.6, preparationTime: "5-8 min", description: "KitKat chocolate shake" },
      { id: "shake-4", name: "Oreo Shake", price: 60, veg: true, rating: 4.7, preparationTime: "5-8 min", description: "Oreo cookie shake" },
      { id: "shake-5", name: "Mango Shake", price: 60, veg: true, rating: 4.6, preparationTime: "5-8 min", description: "Fresh mango milkshake" },
      { id: "shake-6", name: "Litchi Shake", price: 60, veg: true, rating: 4.5, preparationTime: "5-8 min", description: "Fresh litchi milkshake" },
      { id: "shake-7", name: "Cold Coffee with Ice Cream", price: 60, veg: true, rating: 4.6, preparationTime: "5-8 min", description: "Cold coffee with ice cream scoop" },
      { id: "shake-8", name: "Vanilla Shake", price: 60, veg: true, rating: 4.4, preparationTime: "5-8 min", description: "Vanilla flavored milkshake" },
      { id: "shake-9", name: "Chocolate Shake", price: 60, veg: true, rating: 4.5, preparationTime: "5-8 min", description: "Chocolate milkshake" },
      { id: "shake-10", name: "Strawberry Shake", price: 60, veg: true, rating: 4.5, preparationTime: "5-8 min", description: "Strawberry milkshake" },
      { id: "shake-11", name: "Butter Scotch Shake", price: 60, veg: true, rating: 4.6, preparationTime: "5-8 min", description: "Butterscotch milkshake" }
    ]
  },
  {
    category: "South Indian",
    items: [
      { id: "south-1", name: "Idli Sambhar", price: 60, veg: true, rating: 4.5, preparationTime: "15-20 min", description: "Steamed rice cakes with sambhar" },
      { id: "south-2", name: "Vada Sambhar", price: 60, veg: true, rating: 4.6, preparationTime: "15-20 min", description: "Fried lentil dumplings with sambhar" },
      { id: "south-3", name: "Masala Dosa", price: 85, veg: true, rating: 4.7, preparationTime: "20-25 min", description: "Crispy dosa with spiced potato filling" },
      { id: "south-4", name: "Plain Dosa", price: 70, veg: true, rating: 4.4, preparationTime: "15-20 min", description: "Plain crispy dosa" },
      { id: "south-5", name: "Butter Plain Dosa", price: 75, veg: true, rating: 4.5, preparationTime: "15-20 min", description: "Plain dosa with butter" },
      { id: "south-6", name: "Onion Plain Dosa", price: 80, veg: true, rating: 4.6, preparationTime: "15-20 min", description: "Dosa with onion topping" },
      { id: "south-7", name: "Onion Butter Masala Dosa", price: 100, veg: true, rating: 4.8, preparationTime: "20-25 min", description: "Dosa with onion, butter and masala" },
      { id: "south-8", name: "Butter Masala Dosa", price: 95, veg: true, rating: 4.7, preparationTime: "20-25 min", description: "Dosa with butter and masala" },
      { id: "south-9", name: "Paneer Masala Dosa", price: 110, veg: true, rating: 4.8, preparationTime: "20-25 min", description: "Dosa with paneer masala" },
      { id: "south-10", name: "Butter Paneer Dosa", price: 115, veg: true, rating: 4.8, preparationTime: "20-25 min", description: "Dosa with butter and paneer" },
      { id: "south-11", name: "Egg Masala Dosa", price: 100, veg: false, rating: 4.7, preparationTime: "20-25 min", description: "Dosa with egg masala" },
      { id: "south-12", name: "Onion Paneer Butter Masala Dosa", price: 120, veg: true, rating: 4.9, preparationTime: "20-25 min", description: "Dosa with onion, paneer, butter and masala" },
      { id: "south-13", name: "Mysore Masala Dosa", price: 90, veg: true, rating: 4.7, preparationTime: "20-25 min", description: "Dosa with red chutney and masala" },
      { id: "south-14", name: "Mysore Plain Dosa", price: 80, veg: true, rating: 4.5, preparationTime: "15-20 min", description: "Dosa with red chutney" },
      { id: "south-15", name: "Mysore Onion Masala Dosa", price: 95, veg: true, rating: 4.7, preparationTime: "20-25 min", description: "Mysore dosa with onion and masala" },
      { id: "south-16", name: "Mysore Paneer Dosa", price: 110, veg: true, rating: 4.8, preparationTime: "20-25 min", description: "Mysore dosa with paneer" },
      { id: "south-17", name: "Mysore Butter Paneer Dosa", price: 110, veg: true, rating: 4.8, preparationTime: "20-25 min", description: "Mysore dosa with butter and paneer" },
      { id: "south-18", name: "Mysore Butter Masala Dosa", price: 95, veg: true, rating: 4.7, preparationTime: "20-25 min", description: "Mysore dosa with butter and masala" },
      { id: "south-19", name: "Mysore Egg Masala Dosa", price: 110, veg: false, rating: 4.7, preparationTime: "20-25 min", description: "Mysore dosa with egg masala" },
      { id: "south-20", name: "Mysore Egg Paneer Masala Dosa", price: 120, veg: false, rating: 4.8, preparationTime: "20-25 min", description: "Mysore dosa with egg, paneer and masala" }
    ]
  },
  {
    category: "Thali",
    items: [
      { id: "thali-1", name: "Thali", price: 65, veg: true, rating: 4.4, preparationTime: "20-25 min", description: "Complete meal with rice, roti, dal and vegetables" },
      { id: "thali-2", name: "Special Thali", price: 150, veg: true, rating: 4.7, preparationTime: "25-30 min", description: "Premium thali with extra dishes" },
      { id: "thali-3", name: "Chinese Thali", price: 100, veg: true, rating: 4.6, preparationTime: "20-25 min", description: "Chinese style thali" },
      { id: "thali-4", name: "South Indian Thali", price: 100, veg: true, rating: 4.6, preparationTime: "20-25 min", description: "South Indian style thali" },
      { id: "thali-5", name: "Extra Roti", price: 8, veg: true, rating: 4.2, preparationTime: "5 min", description: "Extra bread" },
      { id: "thali-6", name: "Gulab Jamun", price: 15, veg: true, rating: 4.5, preparationTime: "5 min", description: "Sweet gulab jamun" },
      { id: "thali-7", name: "Paneer Thali", price: 100, veg: true, rating: 4.7, preparationTime: "25-30 min", description: "Thali with paneer dishes" }
    ]
  },
  {
    category: "Paratha",
    items: [
      { id: "paratha-1", name: "Aloo Paratha + Chole", price: 60, veg: true, rating: 4.5, preparationTime: "15-20 min", description: "Potato stuffed paratha with chickpea curry" },
      { id: "paratha-2", name: "Onion Paratha + Chole", price: 60, veg: true, rating: 4.5, preparationTime: "15-20 min", description: "Onion stuffed paratha with chickpea curry" },
      { id: "paratha-3", name: "Paneer Paratha + Chole", price: 80, veg: true, rating: 4.7, preparationTime: "15-20 min", description: "Paneer stuffed paratha with chickpea curry" },
      { id: "paratha-4", name: "Special Mix Veg Paratha + Chole", price: 70, veg: true, rating: 4.6, preparationTime: "15-20 min", description: "Mixed vegetable stuffed paratha" },
      { id: "paratha-5", name: "Mooli Paratha + Chole", price: 60, veg: true, rating: 4.4, preparationTime: "15-20 min", description: "Radish stuffed paratha" },
      { id: "paratha-6", name: "Gobi Paratha + Chole", price: 60, veg: true, rating: 4.4, preparationTime: "15-20 min", description: "Cauliflower stuffed paratha" },
      { id: "paratha-7", name: "Egg Paratha + Chole", price: 60, veg: false, rating: 4.5, preparationTime: "15-20 min", description: "Egg paratha with chickpea curry" },
      { id: "paratha-8", name: "Plain Paratha + Chole", price: 60, veg: true, rating: 4.3, preparationTime: "15-20 min", description: "Plain paratha with chickpea curry" }
    ]
  },
  {
    category: "Rice & Combos",
    items: [
      { id: "rice-1", name: "Veg Fried Rice", price: 55, veg: true, rating: 4.5, preparationTime: "15-20 min", description: "Stir-fried rice with vegetables" },
      { id: "rice-2", name: "Egg Fried Rice", price: 80, veg: false, rating: 4.6, preparationTime: "15-20 min", description: "Fried rice with egg" },
      { id: "rice-3", name: "Tomato Rice", price: 55, veg: true, rating: 4.4, preparationTime: "15-20 min", description: "Rice cooked with tomato" },
      { id: "rice-4", name: "Veg Biryani", price: 60, veg: true, rating: 4.6, preparationTime: "20-25 min", description: "Vegetable biryani" },
      { id: "rice-5", name: "Chola Rice", price: 55, veg: true, rating: 4.4, preparationTime: "15-20 min", description: "Rice with chickpea curry" },
      { id: "rice-6", name: "Rajma Rice", price: 55, veg: true, rating: 4.4, preparationTime: "15-20 min", description: "Rice with kidney bean curry" },
      { id: "rice-7", name: "Kadhi Rice", price: 55, veg: true, rating: 4.4, preparationTime: "15-20 min", description: "Rice with kadhi" },
      { id: "rice-8", name: "Veg Fried Rice Chola", price: 75, veg: true, rating: 4.6, preparationTime: "15-20 min", description: "Fried rice with chickpea curry" },
      { id: "rice-9", name: "Sambhar Rice", price: 50, veg: true, rating: 4.4, preparationTime: "15-20 min", description: "Rice with sambhar" },
      { id: "rice-10", name: "Fried Rice Manchurian", price: 80, veg: true, rating: 4.7, preparationTime: "20-25 min", description: "Fried rice with manchurian balls" },
      { id: "rice-11", name: "Rumali Roti with Chaap", price: 80, veg: true, rating: 4.6, preparationTime: "20-25 min", description: "Thin bread with soy chaap" },
      { id: "rice-12", name: "Shahi Paneer with Rumali Roti", price: 80, veg: true, rating: 4.7, preparationTime: "20-25 min", description: "Royal paneer with thin bread" },
      { id: "rice-13", name: "Egg Curry with Rumali Roti", price: 80, veg: false, rating: 4.6, preparationTime: "20-25 min", description: "Egg curry with thin bread" },
      { id: "rice-14", name: "Egg Curry Rice", price: 80, veg: false, rating: 4.6, preparationTime: "20-25 min", description: "Egg curry with rice" },
      { id: "rice-15", name: "Chola Bhature", price: 60, veg: true, rating: 4.5, preparationTime: "20-25 min", description: "Chickpea curry with fried bread" }
    ]
  },
  {
    category: "Cafe Specials",
    items: [
      { id: "cafe-1", name: "Chola Samosa", price: 30, veg: true, rating: 4.4, preparationTime: "10-15 min", description: "Samosa with chickpea curry" },
      { id: "cafe-2", name: "Paneer Rice", price: 90, veg: true, rating: 4.6, preparationTime: "20-25 min", description: "Rice with paneer curry" },
      { id: "cafe-3", name: "Pav Bhaji", price: 55, veg: true, rating: 4.5, preparationTime: "15-20 min", description: "Spiced vegetable curry with bread" }
    ]
  },
  {
    category: "Beverages",
    items: [
      { id: "bev-1", name: "Tea", price: 12, veg: true, rating: 4.3, preparationTime: "5 min", description: "Hot masala tea" },
      { id: "bev-2", name: "Kulhad Lassi", price: 30, veg: true, rating: 4.5, preparationTime: "5 min", description: "Buttermilk in clay cup" },
      { id: "bev-3", name: "Mango Kulhad Lassi", price: 40, veg: true, rating: 4.6, preparationTime: "5 min", description: "Mango flavored buttermilk" },
      { id: "bev-4", name: "Cold Drinks", price: null, veg: true, rating: 4.2, preparationTime: "2 min", description: "Assorted cold drinks" },
      { id: "bev-5", name: "Real Juice", price: null, veg: true, rating: 4.3, preparationTime: "2 min", description: "Fresh fruit juices" },
      { id: "bev-6", name: "Red Bull", price: null, veg: true, rating: 4.2, preparationTime: "2 min", description: "Energy drink" },
      { id: "bev-7", name: "Amul Lassi", price: null, veg: true, rating: 4.4, preparationTime: "2 min", description: "Packaged buttermilk" },
      { id: "bev-8", name: "Amul Buttermilk", price: null, veg: true, rating: 4.4, preparationTime: "2 min", description: "Packaged buttermilk" }
    ]
  }
];

export const categoryIcons: Record<string, string> = {
  "Snacks": "🥟",
  "Maggi": "🍜",
  "Momos": "🥟",
  "Rolls": "🌯",
  "Hot Dog": "🌭",
  "Chinese": "🥡",
  "French Fries": "🍟",
  "Burger": "🍔",
  "Pizza": "🍕",
  "Sandwich": "🥪",
  "Uttapam": "🥞",
  "Shakes": "🥤",
  "South Indian": "🍚",
  "Thali": "🍱",
  "Paratha": "🫓",
  "Rice & Combos": "🍛",
  "Cafe Specials": "☕",
  "Beverages": "🧃"
};
