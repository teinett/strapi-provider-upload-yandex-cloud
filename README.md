# Strapi Upload Provider for Yandex.Cloud Object Storage

Plugin version 1 works with Strapi 3.

Plugin version 2 works with Strapi 4.

---

Yandex.Cloud: <https://cloud.yandex.com/en/services/storage>

Docs: <https://cloud.yandex.com/en/docs/storage/>

Pre-install: create Yandex.Cloud account and a bucket in Object storage.

## Installation

```
# using yarn
yarn add strapi-provider-upload-yandex-cloud

# using npm
npm install strapi-provider-upload-yandex-cloud --save
```

## Parameters

| Parameter  | Description | Example |
| ------------- | ------------- | ------------- |
| YANDEX_CLOUD_ACCESS_KEY_ID | key ID | `pg2ywMziH_9zeZfA7t3w` |
| YANDEX_CLOUD_ACCESS_SECRET | key secret | `aTiO354YNpnO9zKjqBiP1U3nm3F3CoXGLYcldZBC` |
| YANDEX_CLOUD_REGION | bucket region | `ru-central1` |
| YANDEX_CLOUD_BUCKET | bucket name | `strapi-bucket-test` |

## Example

:zero:

Create Strapi project: ([docs](https://docs.strapi.io/dev-docs/quick-start)).

After successfully creating the project stop the dev server: `CTRL + C`.

:one:

Install upload plugin: `npm install strapi-provider-upload-yandex-cloud --save`.

NOTE: Be sure that you are in a folder with your Strapi project: `cd strapi-yandex-cloud-project`.

After successful installation your package.json file will have a code:

```
"dependencies": {
    ...
    "strapi": "^4.7.0",
    "strapi-provider-upload-yandex-cloud": "^2.0.4",
    ...
  },
```

:two:

Go to code editor to your project folder and create config file for your bucket: `./config/plugins.js` (file `plugins.js` in `config` folder in the root of your Strapi project) with the code:



*Strapi v4*:

```javascript
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'strapi-provider-upload-yandex-cloud',
      providerOptions: {
        endpoint: 'https://storage.yandexcloud.net',
        accessKeyId: env('YANDEX_CLOUD_ACCESS_KEY_ID'),
        secretAccessKey: env('YANDEX_CLOUD_ACCESS_SECRET'),
        region: env('YANDEX_CLOUD_REGION'),
        params: {
          Bucket: env('YANDEX_CLOUD_BUCKET'),
          CacheControl: "public, max-age=864000"
        },
      },
    },
  },
});
```

**NOTE**
You can pass aws s3 params  in params object, such as CacheControl, ContentEncoding, etc. More params at: <https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html>

*Strapi v4: Security Middleware Configuration*

Go to code editor to your project folder and create config file for your bucket: `./config/middlewares.js` (file `middlewares.js` in `config` folder in the root of your Strapi project) with the code:

```javascript
const BUCKET = process.env.YANDEX_CLOUD_BUCKET;
const BUCKET_URL = `https://${BUCKET}.storage.yandexcloud.net`;

module.exports = [
  'strapi::errors',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', BUCKET_URL],
          'media-src': ["'self'", 'data:', 'blob:', BUCKET_URL],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
];
```

*Strapi v3* (not supported by Strapi since 2023):

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

:three:

Create a .env file in the root of your Strapi project.

Example of `.env.local`:

```
HOST=0.0.0.0
PORT=1337

YANDEX_CLOUD_ACCESS_KEY_ID=pg2ywMziH_9zeZfA7t3w
YANDEX_CLOUD_ACCESS_SECRET=aTiO354YNpnO9zKjqBiP1U3nm3F3CoXGLYcldZBC
YANDEX_CLOUD_REGION=ru-central1
YANDEX_CLOUD_BUCKET=strapi-bucket-test
```

:four:

Test the new uploader.

1. Start Strapi dev server: `npm run develop`.

2. Open [Strapi media library v3](http://localhost:1337/admin/plugins/upload) or [Strapi media library v4](http://localhost:1337/admin/settings/media-library) in a browser and upload a test image.
