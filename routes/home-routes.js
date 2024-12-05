const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");

router.get("/home", authMiddleware, (req, res) => {
	const { username, userId, role } = req.userInfo;

	res.json({
		message: "Homepage",
		user: {
			_id: userId,
			username,
			role,
		},
	});
});

module.exports = router;
