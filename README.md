# Strapi Upload Provider for Yandex.Cloud Object Storage

Yandex.Cloud: https://cloud.yandex.com/en/services/storage
Docs: https://cloud.yandex.com/en/docs/storage/

## Parameters

YANDEX_CLOUD_ACCESS_KEY_ID=pg2ywMziH_9zeZfA7t3w
YANDEX_CLOUD_ACCESS_SECRET="aTiO354YNpnO9zKjqBiP1U3nm3F3CoXGLYcldZBC"
YANDEX_CLOUD_REGION="ru-central1"
YANDEX_CLOUD_BUCKET="strapi-backet-test"

key : Space access key
secret : Space access secret
endpoint : Base URL of the space (e.g. 'fra.digitaloceanspaces.com')
space : Name of the space in the Digital Ocean panel.
directory : Name of the sub-directory you want to store your files in. (Optionnal - e.g. '/example')
cdn : CDN Endpoint - URL of the cdn of the space (Optionnal - e.g. 'https://cdn.example.com')

## Example

Create Strapi project: `npx create-strapi-app strapi-yandex-cloud --quickstart`

Install upload plugin: `npm i -S strapi-provider-upload-yandex-cloud`

Create config file for your bucket: `./config/plugins.js`

Add the code to the file ./config/plugins.js:

```
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
Create .env file

Exmaple of `.env.local`:

```
HOST=0.0.0.0
PORT=1337

YANDEX_CLOUD_ACCESS_KEY_ID=pg2ywMziH_9zeZfA7t3w
YANDEX_CLOUD_ACCESS_SECRET="aTiO354YNpnO9zKjqBiP1U3nm3F3CoXGLYcldZBC"
YANDEX_CLOUD_REGION="ru-central1"
YANDEX_CLOUD_BUCKET="strapi-backet-test"
```

Start Strapi dev server: `npm run develop`

Open Strapi media library: http://localhost:1337/admin/plugins/upload and upload test image.
