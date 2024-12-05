const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

router.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
	// const { username, userId, role } = req.userInfo;

	res.json({
		message: "Admin page",
		// user: {
		// 	_id: userId,
		// 	username,
		// 	role,
		// },
	});
});

module.exports = router;
