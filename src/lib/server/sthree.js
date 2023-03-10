import * as dotenv from 'dotenv';
dotenv.config();
import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

let config = {
    region: process.env.HIGHFLASH_AWS_REGION,
    credentials:{
        accessKeyId: process.env.HIGHFLASH_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.HIGHFLASH_AWS_SECRET_ACCESS_KEY
    }
}

async function S3Read(key) {
    const S3 = new S3Client(config);
    const bucketParams = {
        Bucket: process.env.HIGHFLASH_S3_BUCKET,
        Key: key
    };
    const data = await S3.send(new GetObjectCommand(bucketParams));
    const chunks = [];
    for await (const chunk of data.Body) {
        chunks.push(Buffer.from(chunk));
    }
    const file = Buffer.concat(chunks);
    return file;
}

// data is a readableStream, such as returned by a multipart form.
async function S3Save(data, filename) {
    const S3 = new S3Client(config);
    const chunks = [];
    for await (const chunk of data.stream()) {
        chunks.push(Buffer.from(chunk));
    }
    const file = Buffer.concat(chunks);

    const uploadParams = {
        Bucket: process.env.HIGHFLASH_S3_BUCKET,
        Key: filename,
        Body: file
    };
    await S3.send(new PutObjectCommand(uploadParams));
    return true;
}

export { S3Save, S3Read }