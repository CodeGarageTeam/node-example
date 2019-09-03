const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = require("express")();

require('dotenv').config();

// connect to Mongo daemon
mongoose
  .connect(process.env.DB_CONN, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// DB schema
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
});

Item = mongoose.model("item", ItemSchema);
app.use(bodyParser.urlencoded({ extended: false }));

//Post route
app.post("/item", (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect("/item"));
});

app.get("/item", (req, res) => {
  Item.find({}, function(err, items) {
    res.send(items);
 });
});

app.listen(process.env.PORT, () => console.log("Server running..."));
