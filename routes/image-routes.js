const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const uploadMiddleware = require("../middleware/upload-middleware");
const {
	uploadImage,
	fetchImagesController,
} = require("../controllers/image-controllers");
co;
const router = express.Router();

// upload the image
router.post(
	"/upload",
	authMiddleware,
	adminMiddleware,
	uploadMiddleware.single("image"),
	uploadImage
);

// get all the images
router.get("/get", authMiddleware, fetchImagesController);

module.exports = router;
