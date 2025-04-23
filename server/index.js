console.clear()

const express = require("express")
const mongoose = require('mongoose');
const dotenv = require("dotenv").config()
const { Schema } = mongoose;
const cors = require("cors")

const PORT = process.env.PORT || 8080
const app = express()
app.use(cors())
app.use(express.json())
const connDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      `MongoDB successfully connected at ${conn.connection.host}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connDb()


const linkSchema = new Schema({
  body: {
    type: String,
    required: true,
    maxLength: 50,
  },
  time: {
    type: Date,
  },
})

const Link = mongoose.model("Link",linkSchema);
app.get('/', async (req,res) => {
	const data = await Link.find({})
	console.log(data)
	res.status(200).json(data)
})
app.post('/', async (req,res) => {
	if(!req.body.link){req.status(400).json({message: "add link"})}
	const link = req.body.link
	const newLink = new Link({
		body:link
	})
	await newLink.save()
	res.status(201).json({ message: "link added successfully" });
})
app.listen(8080, () => {
	console.log("app started")
})
