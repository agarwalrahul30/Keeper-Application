const express = require("express")
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
const dbUrl = process.env.DB_CREDS_URL || "mongodb://localhost:27017/mydb";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Data schema and model
const itemSchema = new mongoose.Schema({
  website: String,
  username: String,
  password: String
});
const Item = mongoose.model('Item', itemSchema);

const sampleData = [
    { website:"GreytHR", username: "KIPI1139", password: "12345" },
    { website:"Random Website", username: "mail.rainbox@gmail.com", password: "R6789@1234" },
    { website:"https://agarwalrahul30.github.io/CV", username: "agarwalrahul30", password: "helloworld007" },
  ];
  
  Item.insertMany(sampleData)
    .then(() => {
      console.log('Sample data added');
    //   mongoose.connection.close();
    })
    .catch(err => console.log(err));

// Sample data endpoint
app.get('/api/data', async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/data', async (req, res) => {
  const { website, username, password } = req.body;

  try {
    const newItem = new Item({ website, username, password });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});