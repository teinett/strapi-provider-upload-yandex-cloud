# Strapi Upload Provider for Yandex.Cloud Object Storage

Yandex.Cloud: <https://cloud.yandex.com/en/services/storage>

Docs: <https://cloud.yandex.com/en/docs/storage/>

Pre-install: create Yandex.Cloud account and a bucket in Object storage.

## Parameters

- YANDEX_CLOUD_ACCESS_KEY_ID - key ID (example: `pg2ywMziH_9zeZfA7t3w`)
- YANDEX_CLOUD_ACCESS_SECRET - key secret (example: `aTiO354YNpnO9zKjqBiP1U3nm3F3CoXGLYcldZBC`)
- YANDEX_CLOUD_REGION - bucket region (example: `ru-central1`)
- YANDEX_CLOUD_BUCKET - bucket name (example: `strapi-bucket-test`)

## Example

:zero:

Create Strapi project ([docs](https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html)): `npx create-strapi-app strapi-yandex-cloud-project --quickstart`.

After successfully creating the project stop the dev server: `CTRL + C`.

:one:

Install upload plugin: `npm i -S strapi-provider-upload-yandex-cloud`.

Note: Be sure that you are in a folder with your Strapi project: `cd strapi-yandex-cloud-project`.

After successful installation your package.json file will have a code:

```
"dependencies": {
    ...
    "strapi": "3.6.5",
    "strapi-provider-upload-yandex-cloud": "1.1.0",
    ...
  },
```

:two:

Go to code editor to your project folder and create config file for your bucket: `./config/plugins.js` (file `plugins.js` in `config` folder in the root of your Strapi project) with the code:

```javascript
module.exports = ({ env }) => ({
  upload: {
    provider: 'yandex-cloud',
    providerOptions: {
      endpoint: 'https://storage.yandexcloud.net',
      accessKeyId: process.env.YANDEX_CLOUD_ACCESS_KEY_ID,
      secretAccessKey: process.env.YANDEX_CLOUD_ACCESS_SECRET,
      region: process.env.YANDEX_CLOUD_REGION,
      params: {
        Bucket: process.env.YANDEX_CLOUD_BUCKET,
        CacheControl: "public, max-age=864000"
      }
    }
  }
});
```

**NOTE**
You can pass aws s3 params  in params object, such as CacheControl, ContentEncoding, etc. More params at: <https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html>

:three:

Create a .env file in the root of your Strapi project.

Example of `.env.local`:

```
HOST=0.0.0.0
PORT=1337

YANDEX_CLOUD_ACCESS_KEY_ID=pg2ywMziH_9zeZfA7t3w
YANDEX_CLOUD_ACCESS_SECRET=aTiO354YNpnO9zKjqBiP1U3nm3F3CoXGLYcldZBC
YANDEX_CLOUD_REGION=ru-central1
YANDEX_CLOUD_BUCKET=strapi-backet-test
```

:four:

Test the new uploader.

1. Start Strapi dev server: `npm run develop`.

2. Open [Strapi media library](http://localhost:1337/admin/plugins/upload) in a browser and upload a test image.
