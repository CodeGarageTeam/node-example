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
  text: {
    type: String,
    required: true
  }
});

Item = mongoose.model("item", ItemSchema);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Post route
app.post("/chat", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    text: req.body.text
  });
  newItem.save().then(item => res.status(201).end());
});

app.get("/chat", (req, res) => {
  Item.find({}, function(err, items) {
    res.send(items);
  });
});

app.delete("/chat", (req, res) => {
  Item.findByIdAndRemove(req.body.id, {}, () => {
    res.status(200).end();
  })
});

app.get("/", (req, res) => {
    res.send("{message: 'coderhood example API'}");
});

app.listen(process.env.PORT, () => console.log("Server running..."));