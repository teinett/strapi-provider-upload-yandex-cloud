# Strapi Upload Provider for Yandex.Cloud Object Storage

Yandex.Cloud: https://cloud.yandex.com/en/services/storage
Docs: https://cloud.yandex.com/en/docs/storage/

## Parameters

- YANDEX_CLOUD_ACCESS_KEY_ID - key ID (no quotes, example: `pg2ywMziH_9zeZfA7t3w`)
- YANDEX_CLOUD_ACCESS_SECRET - key secret (in quotes, example: `"aTiO354YNpnO9zKjqBiP1U3nm3F3CoXGLYcldZBC"`)
- YANDEX_CLOUD_REGION - bucket region (in quotes, example: `"ru-central1"`)
- YANDEX_CLOUD_BUCKET - bucket name (in quotes, example: `"strapi-backet-test"`)

## Example

:zero:
Create Strapi project: `npx create-strapi-app strapi-yandex-cloud --quickstart`.

After successful creating the project sopt the dev server: `CTRL + C`.

:one:
Install upload plugin: `npm i -S strapi-provider-upload-yandex-cloud`.

:two:
Create config file for your bucket: `./config/plugins.js` with the code:

```javascript
module.exports = ({ env })=>({
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
Create .env file.

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

1. Start Strapi dev server: `npm run develop`

2. Open [Strapi media library](http://localhost:1337/admin/plugins/upload) and upload test image.
