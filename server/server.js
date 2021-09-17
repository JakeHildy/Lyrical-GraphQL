const express = require("express");
const models = require("./models");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const schema = require("./schema/schema");
dotenv.config({ path: "./server/.env" });

const app = express();

// Replace with your mongoLab URI
const MONGO_URI = process.env.DB_URI;
if (!MONGO_URI) {
  throw new Error("You must provide a MongoLab URI");
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.log(err));
// mongoose.connection
//   .once("open", () => console.log("Connected to MongoLab instance."))
//   .on("error", (error) => console.log("Error connecting to MongoLab:", error));

app.use(express.json());
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
