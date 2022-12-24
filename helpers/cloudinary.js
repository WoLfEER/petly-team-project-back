const cloudinary = require('cloudinary').v2
const streamifier = require("streamifier");
const { Promise } = require("mongoose");

cloudinary.config({
  clooud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_KEY_SECRET,
});

const uploadImage = (buffer, path) => {
    return new Promise((resolve, reject) => {
      const cldUuploadSstream = cloudinary.uploader.upload_stream(
        {
          width: 328,
          height: 328,
          format: "jpeg",
          folder: path,
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
  
      streamifier.createReadStream(buffer).pipe(cldUuploadSstream);
    });
  };
  
  module.exports = uploadImage;