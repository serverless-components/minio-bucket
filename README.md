# minio-bucket

Instantly create, update and remove Minio Buckets with [Serverless Components](https://github.com/serverless/components).

&nbsp;

1. [Install](#1-install)
2. [Create](#2-create)
3. [Configure](#3-configure)
4. [Deploy](#4-deploy)

&nbsp;

### 1. Install

```console
$ npm install -g serverless
```

### 2. Create

Just create a `serverless.yml` file

```console
$ touch serverless.yml
```

Then create a `.env` file

```console
$ touch .env
```

Update the `.env` file with information about your Minio setup

```
# .env
MINIO_ENDPOINT=minio.example.com
MINIO_SSL=false
MINIO_PORT=9000
MINIO_ACCESS_KEY=xxxx
MINIO_SECRET_KEY=xxxx
```

### 3. Configure

```yml
# serverless.yml
org: acme
app: todo
name: todo-minio-bucket

component: minio-bucket@dev

inputs:
  name: my-bucket
```

### 4. Deploy

```console
$ serverless
```

### New to Components?

Checkout the [Serverless Components](https://github.com/serverless/components) repo for more information.
