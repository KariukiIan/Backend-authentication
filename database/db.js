const mongoose = require("mongoose");
require("dotenv").config();

const connectToDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("mongodb is connected successfully!");
	} catch (error) {
		console.error("MongoDB connection failed", error);
		process.exit(1);
	}
};

module.exports = connectToDB;
