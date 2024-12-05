const { Error } = require("mongoose");
const multer = require("multer");
const path = require("path");

// set our multer storage. Where to store the files.
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + "-" + Date.now() + path.extname(file.originalname)
		);
	},
});

// Image file filter function. This is a fuction to control which files are accepted.
const imageFileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb(new Error("Not an image! Please upload only images"));
	}
};

// Multer middleware
module.exports = multer({
	storage: storage,
	fileFilter: imageFileFilter,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB file size limit
	},
});
