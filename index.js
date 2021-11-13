/** @format */

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");
const path = require("path");
const colors = require("colors");
const morgan = require("morgan");

//const app = express();

dotenv.config({ path: "./config/config.env" });

app.use(express.json());

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("MongoDB Connected");
	})
	.catch((err) => console.log(err));

// Routes
app.use("/api/users", userRoute);

app.use("/api/pins", pinRoute);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("frontend/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 8800;

app.listen(
	PORT,
	console.log(
		`Backend server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
			.yellow.bold,
	),
);
