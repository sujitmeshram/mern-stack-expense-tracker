//from here, I'm gonna store the data inside categories
const model = require("../models/model");

//post:http://localhost:8080/api/categories
async function create__Categories(req, res) {
  const Create = new model.Categories({
    type: "Investment",
    color: "#FCBE44",
  });

  await Create.save(function (err) {
    if (!err) return res.json(Create);
    return res
      .status(400)
      .json({ message: `Error while creating categories ${err}` });
  });
}

//get:http://localhost:8080/api/categories
async function get__Categories(req, res) {
  let data = await model.Categories.find({});
  let filter = await data.map((v) =>
    Object.assign({}, { type: v.type, color: v.color })
  );

  return res.json(filter);
}

// post:http://localhost:8080/api/transaction
async function create__Transaction(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let { name, type, amount } = req.body;

  const create = await new model.Transaction({
    name,
    type,
    amount,
    date: new Date(),
  });

  create.save(function (err) {
    if (!err) return res.json(create);
    return res
      .status(400)
      .json({ message: `Error while creating transaction $(err)` });
  });
}

//get: http://localhost:8080/api/transaction
async function get__Transaction(req, res) {
  let data = await model.Transaction.find({}); //this returns all the data from transaction
  return res.json(data);
}

//delete: http://localhost:8080/api/transaction
async function delete__Transaction(req, res) {
  if (!req.body) res.status(400).json({ message: "Request body not found" });
  await model.Transaction.deleteOne(req.body, function (err) {
    if (!err) res.json("Record Deleted");
  })
    .clone()
    .catch(function (err) {
      res.json("Error while deleting Transaction Record");
    });
}

//get: http://localhost:8080/api/labels
async function get__Labels(req, res) {
  model.Transaction.aggregate([
    {
      //this $lookup key allows us to lookup for specific field from the different collections

      $lookup: {
        from: "categories",
        localField: "type",
        foreignField: "type",
        as: "categories_info",
      },
    },
    {
      $unwind: "$categories_info",
    },
  ])
    .then((result) => {
      let data = result.map((v) =>
        Object.assign(
          {},
          {
            _id: v._id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            color: v.categories_info["color"],
          }
        )
      );
      res.json(data);
    })
    .catch((error) => {
      res.json(400).json("Lookup Collection Error");
    });
}

module.exports = {
  create__Categories,
  get__Categories,
  create__Transaction,
  get__Transaction,
  delete__Transaction,
  get__Labels,
};
