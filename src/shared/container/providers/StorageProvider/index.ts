import { container } from 'tsyringe';

import uploadConfig from '@config/upload';

import DiskStoreageProvider from './implementations/DiskStoreageProvider';
import S3StoreageProvider from './implementations/S3StoreageProvider';
import VimeoStoreageProvider from './implementations/VimeoStoreageProvider';
import IStorageProvider from './models/IStorageProvider';

const providers = {
  disk: DiskStoreageProvider,
  s3: S3StoreageProvider,
  vimeo: VimeoStoreageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);

container.registerSingleton<IStorageProvider>(
  'StorageProviderVimeo',
  providers.vimeo,
);
