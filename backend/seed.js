require("dotenv").config();
const mongoose = require("mongoose");
const Customer = require("./models/Customer");
const Product = require("./models/Product");
const Order = require("./models/Order");

// Utils
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

function calculateTotalAmount(items, products) {
  return items.reduce((sum, item) => {
    const product = products.find(p => p._id.equals(item.product));
    return sum + (product.price * item.quantity);
  }, 0);
}

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Conectado a MongoDB");
};

const seed = async () => {
  await connect();

  await Customer.deleteMany();
  await Product.deleteMany();
  await Order.deleteMany();

  const names = [
    { name: "Alice Johnson", email: "alice@example.com" },
    { name: "Bob Smith", email: "bob@example.com" },
    { name: "Carla Pérez", email: "carla@example.com" },
    { name: "David Lee", email: "david@example.com" },
    { name: "Elena Ruiz", email: "elena@example.com" },
    { name: "Frank Zhang", email: "frank@example.com" }
  ];

  const customerData = names.map(n => ({
    ...n,
    dateOfBirth: randomDate(new Date(1970, 0, 1), new Date(2000, 0, 1))
  }));

  const customers = await Customer.insertMany(customerData);

  const products = await Product.insertMany([
    { name: "iPhone 13", price: 1000, category: "Electronics" },
    { name: "MacBook Pro", price: 2000, category: "Electronics" },
    { name: "Shoes", price: 150, category: "Fashion" },
    { name: "Book", price: 25, category: "Education" },
    { name: "Backpack", price: 75, category: "Accessories" }
  ]);

  const orders = [];

  for (const customer of customers) {
    const orderCount = getRandomInt(1, 4); 

    for (let i = 0; i < orderCount; i++) {
      const items = [];
      const itemCount = getRandomInt(1, 3); 

      for (let j = 0; j < itemCount; j++) {
        const product = products[getRandomInt(0, products.length - 1)];
        const quantity = getRandomInt(1, 3);
        items.push({ product: product._id, quantity });
      }

      const totalAmount = calculateTotalAmount(items, products);
      const orderDate = randomDate(new Date(2023, 0, 1), new Date(2025, 3, 30));

      orders.push({
        customer: customer._id,
        items,
        totalAmount,
        status: "completed",
        orderDate
      });
    }
  }

  await Order.insertMany(orders);

  console.log("✅ Datos sembrados con éxito 🎉");
  process.exit();
};

seed();
