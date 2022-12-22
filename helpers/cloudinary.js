const cloudinary = require('cloudinary').v2
const streamifier = require("streamifier");
const { Promise } = require("mongoose");

const uploadImage = (buffer, path) => {
    return new Promise((resolve, reject) => {
      const cldUuploadSstream = cloudinary.uploader.upload_stream(
        {
          width: 328,
          height: 328,
          format: "png",
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