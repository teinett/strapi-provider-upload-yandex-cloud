"use strict";

const AWS = require('aws-sdk');

module.exports = {

    provider: "yandex-cloud",
    name: "Yandex Cloud Object Storage",

    init(config) {
        const S3 = new AWS.S3({
            apiVersion: '2006-03-01',
            endpoint: config.endpoint,
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey,
            region: config.region,
            params: {
                ACL: 'public-read',
                Bucket: config.Bucket,
                CacheControl: 'public, max-age=31536000, immutable'
            },
          });

        return {
            upload(file, customParams = {}) {
                return new Promise((resolve, reject) => {
                    // upload file on S3 bucket
                    const path = file.path ? `${file.path}/` : '';
                    S3.upload(
                        {
                            Key: `${path}${file.hash}${file.ext}`,
                            Body: Buffer.from(file.buffer, 'binary'),
                            ACL: 'public-read',
                            ContentType: file.mime,
                            ...customParams,
                        },
                        (err, data) => {
                            if (err) {
                                return reject(err);
                            }

                            // set the bucket file url
                            file.url = data.Location;

                            resolve();
                        }
                    );
                });
            },

            delete(file, customParams = {}) {
                return new Promise((resolve, reject) => {
                    // delete file on S3 bucket
                    const path = file.path ? `${file.path}/` : '';
                    S3.deleteObject(
                        {
                            Key: `${path}${file.hash}${file.ext}`,
                            ...customParams,
                        },
                        (err, data) => {
                            if (err) {
                                return reject(err);
                            }

                            resolve();
                        }
                    );
                });
            },
        };
    },
};
