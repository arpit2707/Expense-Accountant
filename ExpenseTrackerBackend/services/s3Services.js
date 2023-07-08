const AWS = require("aws-sdk");

const uploadToS3 = (data, fileName) => {
  const BUCKET_NAME = "expensetrack";
  const IAM_USER_KEY = process.env.IAM_ACCESS_KEY;
  const IAM_SECRET_KEY = process.env.IAM_SECRET_KEY;
  return new Promise((resolve, reject) => {
    const s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_SECRET_KEY,
      Bucket: BUCKET_NAME,
    });

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: data,
      ACL: "public-read",
    };
    //This upload function is asynchronous bcoz of which we are returning the promise we could have wrapped only upload
    // into return promise callback
    s3bucket.upload(params, (err, s3response) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(`File URL: ${s3response.Location}`);
        const fileUrl = s3response.Location;
        console.log("Upload success");
        resolve(fileUrl);
      }
    });
  });
};

module.exports = {
  uploadToS3,
};
