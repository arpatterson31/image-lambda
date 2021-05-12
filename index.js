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
    let results = await s3.listObjects(params).promise();
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