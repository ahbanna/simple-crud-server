const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");
app.use(cors());

app.use(express.json());

// mongodb starts
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://tutul5800:mI9VeLY5onayiJWS@cluster0.k7baavr.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // come from node mongodb crud start
    const database = client.db("insertDB");
    const userCollection = database.collection("haiku");
    // come from node mongodb crud end

    app.get("/users", async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // create API to receive data from client side start
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log("New User", user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
    // create API to receive data from client side end

    // Delete starts
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("delete", id);
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    // Delete end

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
// mongodb end

app.get("/", (req, res) => {
  res.send("simple card is running");
});
// tutul5800
// mI9VeLY5onayiJWS
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
