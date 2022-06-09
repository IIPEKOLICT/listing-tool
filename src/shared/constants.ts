import { ListingParams } from './types';
import { join } from 'path';

export const DEFAULT_LISTING_PARAMS: ListingParams = {
  root: '/home/iipekolict/github',
  output: 'listing.txt',
  comment: {
    enabled: true,
    start: '// ',
    end: '',
  },
  paddings: 1,
  encoding: 'utf8',
  strict: false,
  ignore: {
    items: [],
    extensions: [],
  },
  only: {
    items: [],
    extensions: [],
  },
};

export const REPOSITORY_ROOT_PATH: string = process.cwd();

export const SETTINGS_FILE_PATH: string = join(REPOSITORY_ROOT_PATH, 'settings.json');

export const DIST_PATH: string = join(REPOSITORY_ROOT_PATH, 'dist');
