const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
let port = process.env.PORT || 3000;

const stats = require(path.join(__dirname, "routes/stats"));
const products = require(path.join(__dirname, "routes/products"));
const category = require(path.join(__dirname, "routes/category"));
const sales = require(path.join(__dirname, "routes/sales"));

const db = require(path.join(__dirname, "config/database"));

mongoose.connect(db.mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log("Connected to database"))
	.catch(err => console.log(err));

app.use(express.static(path.join(__dirname, "/public")));

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.render("home");
});

app.use("/stats", stats);
app.use("/products", products);
app.use("/category", category);
app.use("/sales", sales);

app.listen(port, err => {
	if (err) throw err;
	console.log(`Server is listening on port ${port}`);
});
