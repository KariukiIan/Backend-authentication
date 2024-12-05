const Image = require("../models/image");
const uploadToCloudinary = require("../helpers/cloudinaryHelper");

// Upload Images.
const uploadImage = async (req, res) => {
	try {
		// Check if file is missing in req object
		if (!req.file) {
			return res.status(400).json({
				success: false,
				message: "file is required! Please upload an image",
			});
		}

		// Upload to cloudinary, when there is a file in the req. Also get the returned secure_url and the public_id from cloudinary.
		const { url, publicId } = await uploadToCloudinary(req.file.path);

		// Store the data of the secure_url of the image, public_id and the user  who uploaded(user_id) the picture in the mongodb database. This data has been returned from cloudinary.
		const newlyUploadedImage = new Image({
			url,
			publicId,
			uploadedBy: req.userInfo.userId,
		});

		await newlyUploadedImage.save();
		// delete the file from local storage
		//fs.unlinkSync(req.file.path);

		re.status(201).json({
			success: true,
			message: "Image uploaded successfully",
			image: newlyUploadedImage,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "something went wrong! Try again.",
		});
	}
};

// Fetch all the Images.
const fetchImagesController = async (req, res) => {
	try {
		const images = await Image.find({});

		if (images) {
			res.status(200).json({
				success: true,
				data: images,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "something went wrong! Try again.",
		});
	}
};

module.exports = { uploadImage, fetchImagesController };
