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

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {}
}

export default VimeoStorageProvider;
