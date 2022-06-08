import { ListingParams } from './types';

export interface IFileService {
  read(path?: string, encoding?: string): Promise<string>;
  write(path?: string, encoding?: string, data?: string): Promise<boolean>;
  append(path?: string, encoding?: string, data?: string): Promise<boolean>;
}

export interface IConfigService {
  getParams(): ListingParams[];
  loadConfigs(): Promise<void>;
}

export interface IListingService {
  setParams(params: ListingParams): IListingService;
  create(): Promise<void>;
}
