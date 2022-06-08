import { IConfigService, IFileService, IListingService } from './shared/interfaces';
import { ConfigService, FileService, ListingService } from './services';

const fileService: IFileService = new FileService();
const configService: IConfigService = new ConfigService(fileService);
const listingService: IListingService = new ListingService(fileService);

(async function main() {
  await configService.loadConfigs();

  for (const listingParams of configService.getParams()) {
    await listingService.setParams(listingParams).create();
  }
})();
