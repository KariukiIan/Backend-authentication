const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register controller
const registerUser = async (req, res) => {
	try {
		// Extract user information from our request body.
		const { username, email, password, role } = req.body;

		// Check if the user exists in the database
		const CheckExistingUser = await User.findOne({
			$or: [{ username }, { email }],
		});
		if (CheckExistingUser) {
			return res.status(400).json({
				success: false,
				message:
					"Username or Email exists! Please ENTER a differnt Username or Email.",
			});
		}

		// Continue with user registration.
		// Hash the user pwd.
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create a new user and save in the database.
		const newCreatedUser = new User({
			username,
			email,
			password: hashedPassword,
			role: role || "user",
		});

		await newCreatedUser.save();

		if (newCreatedUser) {
			res.status(201).json({
				success: true,
				message: "User registered successfully!",
			});
		} else {
			res.status(400).json({
				success: false,
				message: "Unable to register User. Please try again",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Something went wrong! Please try again later.",
		});
	}
};

// Login controller
const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;

		// Find if the current user exists in the database
		const user = await User.findOne({ username });

		if (!user) {
			res.status(400).json({
				success: false,
				message: "invalid username or password!",
			});
		}

		// This step will execute when the username exists in the database
		// We will now check if the username in the database matches with the password the user provided
		const isPasswordMatch = await bcrypt.compare(password, user.password);

		if (!isPasswordMatch) {
			res.status(400).json({
				success: false,
				message: "invalid username or password!",
			});
		}

		// Create user token
		const accessToken = jwt.sign(
			{
				userId: user._id,
				username: user.username,
				role: user.role,
			},
			process.env.JWT_SECRET_KEY,
			{ expiresIn: "30m" }
		);

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			accessToken,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Something went wrong! Please try again later.",
		});
	}
};

module.exports = { loginUser, registerUser };
