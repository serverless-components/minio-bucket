const Minio = require('minio')
const { Component } = require('@serverless/core')

const defaults = {}

class MinioBucket extends Component {
  async deploy(inputs = {}) {
    const config = {
      ...defaults,
      ...inputs
    }

    const minio = this.getMinioClient()

    const { name } = config
    if (!(await minio.bucketExists(name))) {
      await minio.makeBucket(name)
    }

    this.state = config
    return this.state
  }

  async remove(inputs = {}) {
    const config = {
      ...defaults,
      ...inputs,
      ...this.state
    }

    const minio = this.getMinioClient()

    // Remove all objects
    const { name } = config
    const objects = await new Promise((resolve, reject) => {
      const objs = []
      const stream = minio.listObjectsV2(name)
      stream.on('data', (object) => {
        objs.push(object.name)
      })
      stream.on('end', () => resolve(objs))
      stream.on('error', (error) => reject(error))
    })
    await minio.removeObjects(name, objects)

    // Remove the bucket
    await minio.removeBucket(name)

    this.state = {}
    return {}
  }

  // "private" methods
  getMinioClient() {
    const { endpoint, accessKey, secretKey } = this.credentials.minio
    const port = Number(this.credentials.minio.port)
    const useSSL = this.credentials.minio.ssl == 'true'
    return new Minio.Client({
      endPoint: endpoint,
      useSSL,
      port,
      accessKey,
      secretKey
    })
  }
}

module.exports = MinioBucket
