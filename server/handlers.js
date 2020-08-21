const assert = require("assert");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//HANDLERS

const logIn = async (req, res) => {
  const _id = req.body.email;
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("meditation_app");
    const r = await db.collection("users").findOne({ _id }, (err, result) => {
      if (result && result.password === req.body.password) {
        res.status(200).json({ status: 200, _id, data: result });
      } else if (result) {
        res.status(401).json({ status: 401, _id, data: "Incorrect password" });
      } else {
        res.status(404).json({ status: 404, _id, data: "Not Found" });
      }
      client.close();
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const createUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("meditation_app");
    const r = await db.collection("users").insertOne(req.body);
    assert.equal(1, r.insertedCount);
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  client.close();
};

const addMeditation = async (req, res) => {
  const _id = req.body._id;
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("meditation_app");
    const newValues = {
      $push: {
        meditations: req.body.meditation,
      },
    };
    const r = await db.collection("users").updateOne({ _id }, newValues);
    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);
    res.status(200).json({ status: 200, data: { ...req.body } });
  } catch (err) {
    console.log(err.stack);
    res
      .status(500)
      .json({ status: 500, data: { ...req.body }, message: err.message });
  }

  client.close();
};

module.exports = {
  createUser,
  logIn,
  addMeditation,
};
