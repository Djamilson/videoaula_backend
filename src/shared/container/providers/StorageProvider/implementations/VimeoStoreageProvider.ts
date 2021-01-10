import fs from 'fs';
import mime from 'mime';
import path from 'path';
import { Vimeo } from 'vimeo';

import uploadConfig from '@config/upload';

import IStorageProvider from '../models/IStorageProvider';

class VimeoStorageProvider implements IStorageProvider {
  private client;

  constructor() {
    this.client = new Vimeo(
      `${process.env.VIMEO_CLIENT_ID}`,
      `${process.env.VIMEO_CLIENT_SECRET}`,
      `${process.env.VIMEO_ACCESS_TOKEN}`,
    );
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    console.log('Estou no vimeo: Meu accessToken', this.client.accessToken);

    /*
    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise()
      .catch(err => {
        console.log('Upload failed:', err);
      }); */

    /* this.client.generateClientCredentials(scope, function (err, response) {
      if (err) {
        throw err;
      }
      const token = response.access_token;
      const scopes = response.scope;

      console.log('Meus dados: ', token, scopes);
    }); */

    // `redirect_uri` must be provided, and must match your configured URI.
    /* this.client.accessToken(code, redirect_uri, function (err, response) {
      if (err) {
        return response.end(`error\n${err}`);
      }

      if (response.access_token) {
        this.client.setAccessToken(response.access_token);

        const scopes = response.scope;
        const { user } = response;
      }
    }); */

    await fs.promises.unlink(originalPath);

    return file;
  }

  /* public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  } */
}

export default VimeoStorageProvider;
