require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const { getUser } = require("./middleware/auth");

const typeDefs = require("./schema/typeDefs");
const resolvers = require("./resolvers");

async function startServer() {
  const app = express();
  
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: async ({ req }) => {
      const user = await getUser(req);
      return { user };
    }
  });

  await server.start();
  server.applyMiddleware({ app });

  await mongoose.connect(process.env.MONGO_URI);
  console.log("🚀 MongoDB connected");

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
