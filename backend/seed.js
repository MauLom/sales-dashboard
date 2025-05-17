require("dotenv").config();
const mongoose = require("mongoose");
const Customer = require("./models/Customer");
const Product = require("./models/Product");
const Order = require("./models/Order");

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Conectado a MongoDB");
};

const seed = async () => {
  await connect();

  await Customer.deleteMany();
  await Product.deleteMany();
  await Order.deleteMany();

  const customers = await Customer.insertMany([
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob", email: "bob@example.com" }
  ]);

  const products = await Product.insertMany([
    { name: "iPhone 13", price: 1000, category: "Electronics" },
    { name: "MacBook Pro", price: 2000, category: "Electronics" },
    { name: "Shoes", price: 150, category: "Fashion" }
  ]);

  const orders = [
    {
      customer: customers[0]._id,
      items: [
        { product: products[0]._id, quantity: 1 },
        { product: products[2]._id, quantity: 2 }
      ],
      totalAmount: 1000 + 150 * 2,
      status: "completed",
      orderDate: new Date("2024-12-01")
    },
    {
      customer: customers[0]._id,
      items: [
        { product: products[1]._id, quantity: 1 }
      ],
      totalAmount: 2000,
      status: "completed",
      orderDate: new Date("2025-01-10")
    },
    {
      customer: customers[1]._id,
      items: [
        { product: products[2]._id, quantity: 3 }
      ],
      totalAmount: calculateTotalAmount(
        [
          { product: products[2]._id, quantity: 3 }
        ],
        products
      ),
      status: "completed",
      orderDate: new Date("2025-02-01")
    }
  ];

  await Order.insertMany(orders);

  console.log("✅ Datos sembrados con éxito");
  process.exit();
};

seed();
