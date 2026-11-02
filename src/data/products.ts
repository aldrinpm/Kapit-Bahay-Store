import { Product } from '../types/cart.types';
export const PRODUCTS: Product[] = [
  // Rice and Grains
  { id: 'p001', name: 'Premium Philippine Rice (5kg)', description: 'High quality local rice for daily meals.', category: 'Rice and Grains', price: 450.00, stock: 150, imageUrl: 'images/rice5kg.jpg' },
  { id: 'p002', name: 'Brown Rice (2kg)', description: 'Nutritious brown rice.', category: 'Rice and Grains', price: 199.50, stock: 200, imageUrl: 'images/brownrice2kg.jpg' },
  // Canned Goods
  { id: 'p003', name: 'Canned Sardines in Tomato Sauce (150g)', description: 'Affordable and versatile canned fish.', category: 'Canned Goods', price: 35.00, stock: 300, imageUrl: 'images/sardines.jpg', isFeatured: true },
  { id: 'p004', name: 'Canned Corn (200g)', description: 'Sweet corn kernels.', category: 'Canned Goods', price: 28.00, stock: 250, imageUrl: 'images/cannedcorn.jpg' },
  // Instant Food
  { id: 'p005', name: 'Instant Noodles (5 pack)', description: 'Quick and satisfying meal.', category: 'Instant Food', price: 65.00, stock: 400, imageUrl: 'images/instantnoodles.jpg' },
  { id: 'p006', name: 'Instant Oatmeal Mix (500g)', description: 'Healthy and quick breakfast.', category: 'Instant Food', price: 120.00, stock: 180, imageUrl: 'images/oatmeal.jpg' },
  // Snacks and Biscuits
  { id: 'p007', name: 'Assorted Biscuits (200g)', description: 'Classic Filipino snack pack.', category: 'Snacks and Biscuits', price: 55.00, stock: 320, imageUrl: 'images/biscuits.jpg', isDiscounted: true },
  { id: 'p008', name: 'Potato Chips (Large)', description: 'Crispy, savory potato chips.', category: 'Snacks and Biscuits', price: 75.00, stock: 280, imageUrl: 'images/chips.jpg' },
  // Beverages
  { id: 'p009', name: 'Bottled Water (1.5L)', description: 'Essential drinking water.', category: 'Beverages', price: 20.00, stock: 500, imageUrl: 'images/water1.5l.jpg' },
  { id: 'p010', name: 'Iced Tea (1L)', description: 'Refreshing local iced tea.', category: 'Beverages', price: 45.00, stock: 220, imageUrl: 'images/icedtea.jpg' },
  // Personal Care
  { id: 'p011', name: 'Bar Soap (50g)', description: 'Everyday cleansing soap.', category: 'Personal Care', price: 18.00, stock: 450, imageUrl: 'images/soap.jpg' },
  { id: 'p012', name: 'Shampoo (200ml)', description: 'Daily hair care.', category: 'Personal Care', price: 95.00, stock: 190, imageUrl: 'images/shampoo.jpg' },
  // Household Essentials
  { id: 'p013', name: 'Dishwashing Liquid (500ml)', description: 'Effective kitchen cleaner.', category: 'Household Essentials', price: 70.00, stock: 270, imageUrl: 'images/dishwash.jpg' },
  { id: 'p014', name: 'Laundry Detergent Powder (1kg)', description: 'Large family laundry supply.', category: 'Household Essentials', price: 185.00, stock: 160, imageUrl: 'images/laundry.jpg', isFeatured: true },
  // Condiments and Cooking Ingredients
  { id: 'p015', name: 'Soy Sauce (500ml)', description: 'Essential Filipino cooking condiment.', category: 'Condiments and Cooking Ingredients', price: 50.00, stock: 310, imageUrl: 'images/soy sauce.jpg' },
  { id: 'p016', name: 'Vinegar (1L)', description: 'All-purpose cooking vinegar.', category: 'Condiments and Cooking Ingredients', price: 40.00, stock: 290, imageUrl: 'images/vinegar.jpg' },
  // Dairy and Breakfast
  { id: 'p017', name: 'Evaporated Milk (370g)', description: 'For coffee and cooking.', category: 'Dairy and Breakfast', price: 68.00, stock: 230, imageUrl: 'images/evaporatedmilk.jpg' },
  { id: 'p018', name: 'Bread Loaf (Whole Wheat)', description: 'Fresh, affordable daily bread.', category: 'Dairy and Breakfast', price: 42.00, stock: 350, imageUrl: 'images/bread.jpg' },
  // School Supplies
  { id: 'p019', name: 'Notebook (A5)', description: 'For school and daily notes.', category: 'School Supplies', price: 25.00, stock: 480, imageUrl: 'images/notebook.jpg' },
  { id: 'p020', name: 'Ballpoint Pen (Blue)', description: 'Standard writing tool.', category: 'School Supplies', price: 10.00, stock: 600, imageUrl: 'images/pen.jpg' },
  
  // Additional products to reach 40+
  // Rice/Grains
  { id: 'p021', name: 'Parboiled Rice (10kg)', description: 'Bulk rice for large households.', category: 'Rice and Grains', price: 850.00, stock: 50, imageUrl: 'images/rice10kg.jpg' },
  // Canned Goods
  { id: 'p022', name: 'Canned Tuna in Oil (180g)', description: 'High protein canned tuna.', category: 'Canned Goods', price: 58.00, stock: 210, imageUrl: 'images/tuna.jpg' },
  // Instant Food
  { id: 'p023', name: 'Mami Instant Noodles (3 pack)', description: 'Classic, savory instant meal.', category: 'Instant Food', price: 70.00, stock: 300, imageUrl: 'images/mami.jpg' },
  // Snacks and Biscuits
  { id: 'p024', name: 'Peanut Candies (200g)', description: 'Sweet local candy snack.', category: 'Snacks and Biscuits', price: 40.00, stock: 350, imageUrl: 'images/candies.jpg' },
  // Beverages
  { id: 'p025', name: 'Soft Drink (2L)', description: 'Classic bubbly refreshment.', category: 'Beverages', price: 55.00, stock: 190, imageUrl: 'images/softdrink2l.jpg' },
  // Personal Care
  { id: 'p026', name: 'Toothpaste Tube', description: 'Daily oral hygiene care.', category: 'Personal Care', price: 48.00, stock: 260, imageUrl: 'images/toothpaste.jpg' },
  // Household Essentials
  { id: 'p027', name: 'Plastic Trash Bags (Roll)', description: 'Essential waste disposal.', category: 'Household Essentials', price: 30.00, stock: 330, imageUrl: 'images/trashbags.jpg' },
  // Condiments and Cooking Ingredients
  { id: 'p028', name: 'Fish Sauce (500ml)', description: 'Umami boost for Filipino cuisine.', category: 'Condiments and Cooking Ingredients', price: 60.00, stock: 240, imageUrl: 'images/fishsauce.jpg' },
  // Dairy and Breakfast
  { id: 'p029', name: 'Margarine Block (250g)', description: 'For baking and toast.', category: 'Dairy and Breakfast', price: 55.00, stock: 280, imageUrl: 'images/margarine.jpg' },
  { id: 'p030', name: 'Breakfast Cereal (300g)', description: 'Quick, sweet breakfast.', category: 'Dairy and Breakfast', price: 85.00, stock: 200, imageUrl: 'images/cereal.jpg' },
  // School Supplies
  { id: 'p031', name: 'Eraser Set', description: 'Basic school accessory.', category: 'School Supplies', price: 12.00, stock: 550, imageUrl: 'images/eraser.jpg' },
  // Filler to reach 40
  { id: 'p032', name: 'Coffee Grounds (250g)', description: 'Local blend coffee for the morning.', category: 'Condiments and Cooking Ingredients', price: 110.00, stock: 170, imageUrl: 'images/coffee.jpg' },
  { id: 'p033', name: 'Tea Bags (50 count)', description: 'Hot tea for relaxation.', category: 'Beverages', price: 42.00, stock: 300, imageUrl: 'images/teabags.jpg' },
  { id: 'p034', name: 'Hand Sanitizer (200ml)', description: 'On-the-go hygiene.', category: 'Personal Care', price: 62.00, stock: 220, imageUrl: 'images/handsanitizer.jpg' },
  { id: 'p035', name: 'Plastic Utensils Set', description: 'Disposable kitchen tools.', category: 'Household Essentials', price: 25.00, stock: 310, imageUrl: 'images/utensils.jpg' },
  { id: 'p036', name: 'Corned Beef (200g)', description: 'Classic Filipino breakfast meat.', category: 'Canned Goods', price: 88.00, stock: 150, imageUrl: 'images/cornedbeef.jpg', isDiscounted: true },
  { id: 'p037', name: 'Cheese Slices (Pack of 10)', description: 'For sandwiches and snacks.', category: 'Dairy and Breakfast', price: 150.00, stock: 180, imageUrl: 'images/cheese.jpg', isFeatured: true },
  { id: 'p038', name: 'Energy Bar', description: 'Quick fuel for students and workers.', category: 'Snacks and Biscuits', price: 60.00, stock: 290, imageUrl: 'images/energybar.jpg' },
  { id: 'p039', name: 'School Ruler (30cm)', description: 'Basic geometric tool.', category: 'School Supplies', price: 15.00, stock: 500, imageUrl: 'images/ruler.jpg' },
  { id: 'p040', name: 'Instant Hot Chocolate Mix', description: 'Quick, warm, sweet treat.', category: 'Instant Food', price: 72.00, stock: 250, imageUrl: 'images/hotchocolate.jpg' },
];

// Map to quickly look up product by ID
export const PRODUCT_MAP = PRODUCTS.reduce((acc, product) => {
  acc[product.id] = product;
  return acc;
}, {} as Record<string, Product>);

// Export the full list and map for easy use
export default PRODUCTS;