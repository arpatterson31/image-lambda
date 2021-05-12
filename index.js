'use strict';

const aws = require('aws-sdk');
const s3 = new aws.S3();

exports.handler = async (event, context) => {
  const bucket = event.Records[0].s3.bucket.name;
  const params = {
    Bucket: bucket,
  };

  let imgArray = [];

  try {
    let results = await s3.listObjects(params).promise(); // does not have a body, need to map through contents for obj data
    imgArray = results.Contents.map(item => {
      let metaObj = {
        Name: item.Key,
        Size: item.Size,
        Type: item.Type
      };
      return metaObj;
    });
  }
  catch (err) {
    console.log(err);
  }
  console.log(JSON.stringify(event), JSON.stringify(imgArray));

  return 's3 bucket trigger this';
}

// const upload = async () => {
//   const params = {
//     ACL: 'public-read',
//     Body: JSON.stringify(imgArray),
//     ContentType: 'application/json',
//     Bucket: 'lambda-images-lab',
//     Key: 'images.json'
//   };

//   return await new Promise((resolve, reject) => {
//     s3.putObject(params, (err, results) => {
//       if (err) reject(err);
//       else resolve(results);
//     });
//   });
// }
