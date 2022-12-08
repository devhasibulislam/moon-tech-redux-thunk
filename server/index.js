/* external imports */
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

/* application level connection */
const app = express();
const port = process.env.PORT || 5000;

/* middlewares connection */
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@todoapp.mfoky.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

/* application methods integration */
const run = async () => {
  try {
    const db = client.db("moon-tech");
    const productCollection = db.collection("products");
    console.log("Moon Tech connected successfully.");

    app.get("/products", async (req, res) => {
      const cursor = productCollection.find({});
      const product = await cursor.toArray();

      res.status(200).send({
        status: true,
        message: "OK",
        description: "Fetching all products successfully.",
        data: product,
      });
    });

    app.post("/product", async (req, res) => {
      const product = req.body;
      const result = await productCollection.insertOne(product);

      res.status(201).send({
        status: true,
        message: "Created",
        description: "New product insert successfully.",
        data: result,
      });
    });

    app.delete("/product/:id", async (req, res) => {
      const id = req.params.id;
      const result = await productCollection.deleteOne({ _id: ObjectId(id) });

      res.status(202).send({
        status: true,
        message: "Accepted",
        description: "Remove existing product successfully.",
        data: result,
      });
    });
  } finally {
    // await client.close();
  }
};
run().catch((err) => console.log(err));

/* application connection establishment */
app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "OK",
    description: "Moon Tech connection establish successfully.",
  });
});

app.listen(port, () => {
  console.log(`Moon Tech listening on port ${port}.`);
});
