# Strapi Upload Provider for Yandex.Cloud Object Storage

Yandex.Cloud: https://cloud.yandex.com/en/services/storage

Docs: https://cloud.yandex.com/en/docs/storage/

Pre-install: create Yandex.Cloud account and a bucket in Object storage.

## Parameters

- YANDEX_CLOUD_ACCESS_KEY_ID - key ID (no quotes, example: `pg2ywMziH_9zeZfA7t3w`)
- YANDEX_CLOUD_ACCESS_SECRET - key secret (in quotes, example: `"aTiO354YNpnO9zKjqBiP1U3nm3F3CoXGLYcldZBC"`)
- YANDEX_CLOUD_REGION - bucket region (in quotes, example: `"ru-central1"`)
- YANDEX_CLOUD_BUCKET - bucket name (in quotes, example: `"strapi-backet-test"`)

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
    "strapi-provider-upload-yandex-cloud": "1.0.0",
    ...
  },
```

:two:

Go to code editor to yout project folder and create config file for your bucket: `./config/plugins.js` (file `plugins.js` in `config` folder in the root of your Strapi project) with the code:

```javascript
module.exports = ({ env }) => ({
  upload: {
    provider: 'yandex-cloud',
    providerOptions: {
      endpoint: 'https://storage.yandexcloud.net',
      accessKeyId: env('YANDEX_CLOUD_ACCESS_KEY_ID'),
      secretAccessKey: env('YANDEX_CLOUD_ACCESS_SECRET'),
      region: env('YANDEX_CLOUD_REGION'),
      params: {
        Bucket: env('YANDEX_CLOUD_BUCKET'),
      },
    },
  },
});
```

:three:

Create a .env file in the root of your Strapi project.

Example of `.env.local`:

```
HOST=0.0.0.0
PORT=1337

YANDEX_CLOUD_ACCESS_KEY_ID=pg2ywMziH_9zeZfA7t3w
YANDEX_CLOUD_ACCESS_SECRET="aTiO354YNpnO9zKjqBiP1U3nm3F3CoXGLYcldZBC"
YANDEX_CLOUD_REGION="ru-central1"
YANDEX_CLOUD_BUCKET="strapi-backet-test"
```

:four:

Test the new uploader.

1. Start Strapi dev server: `npm run develop`.

2. Open [Strapi media library](http://localhost:1337/admin/plugins/upload) in a browser and upload a test image.
