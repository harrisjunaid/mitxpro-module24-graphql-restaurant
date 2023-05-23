var { graphqlHTTP } = require("express-graphql");
var { buildSchema, assertInputType } = require("graphql");
var express = require("express");
import schema from './schema';

// import { graphqlHTTP } from "express-graphql";
// import { buildSchema, assertInputType } from "graphql";
// import express from "express";

// Construct a schema, using GraphQL schema language
var restaurants = [
  {
    id: 1,
    name: "WoodsHill ",
    description:
      "American cuisine, farm to table, with fresh produce every day",
    dishes: [
      {
        name: "Swordfish grill",
        price: 27,
      },
      {
        name: "Roasted Broccily ",
        price: 11,
      },
    ],
  },
  {
    id: 2,
    name: "Fiorellas",
    description:
      "Italian-American home cooked food with fresh pasta and sauces",
    dishes: [
      {
        name: "Flatbread",
        price: 14,
      },
      {
        name: "Carbonara",
        price: 18,
      },
      {
        name: "Spaghetti",
        price: 19,
      },
    ],
  },
  {
    id: 3,
    name: "Karma",
    description:
      "Malaysian-Chinese-Japanese fusion, with great bar and bartenders",
    dishes: [
      {
        name: "Dragon Roll",
        price: 12,
      },
      {
        name: "Pancake roll ",
        price: 11,
      },
      {
        name: "Cod cakes",
        price: 13,
      },
    ],
  },
];

// The root provides a resolver function for each API endpoint

var root = {
  restaurant: (arg) => restaurants[arg.id],
  restaurants: () => restaurants,
  setrestaurant: ({ input }) => {
    restaurants.push(
      {
         name: input.name,
         description: input.description,
      });
    return input;
  },
  deleterestaurant: ({ id }) => {
    const ok = Boolean(restaurants[id]);
    let delc = restaurants[id];
    restaurants = restaurants.filter((item) => item.id !== id);
    console.log(JSON.stringify(delc));
    return { ok };
  },
  editrestaurant: ({ id, ...restaurant }) => {
    if (!restaurants[id]) {
      throw new Error("restaurant doesn't exist");
    }
    restaurants[id] = {
      ...restaurants[id],
      ...restaurant,
    };
    return restaurants[id];
  },
};
var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
var port = 5502;
app.listen(port, () => console.log("Running Graphql on Port:" + port));

export default root;
