import {
  CommentParams,
  ListingParams,
  PartialCommentParams,
  PartialConfig,
  PartialListingParams,
  PartialSearchParams,
  SearchParams,
} from '../shared/types';
import { DEFAULT_LISTING_PARAMS, SETTINGS_FILE_PATH } from '../shared/constants';
import { IConfigService, IFileService } from '../shared/interfaces';

export default class ConfigService implements IConfigService {
  private params: ListingParams[] = [];

  constructor(private readonly file: IFileService) {}

  getParams(): ListingParams[] {
    return this.params;
  }

  async loadConfigs(): Promise<void> {
    try {
      const configFileData: string = await this.file.read(SETTINGS_FILE_PATH);

      console.log(`Load configuration from settings.json...`);
      this.params = ((JSON.parse(configFileData) as PartialConfig).params || []).map(
        (listingParams: PartialListingParams) => ConfigService.parseListingParams(listingParams)
      );
    } catch (e) {
      console.error('Fatal error: no configuration file');
      process.exit();
    }
  }

  private static parseListingParams(partialParams: PartialListingParams): ListingParams {
    const { root, encoding, output, paddings, strict } = DEFAULT_LISTING_PARAMS;

    return {
      root: partialParams.root || root,
      output: partialParams.output || output,
      comment: ConfigService.parseCommentParams(
        DEFAULT_LISTING_PARAMS.comment,
        partialParams.comment
      ),
      paddings: partialParams.paddings || paddings,
      encoding: partialParams.encoding || encoding,
      strict: partialParams.strict || strict,
      ignore: ConfigService.parseSearchParams(DEFAULT_LISTING_PARAMS.ignore, partialParams.ignore),
      only: ConfigService.parseSearchParams(DEFAULT_LISTING_PARAMS.only, partialParams.only),
    };
  }

  private static parseSearchParams(
    donor: SearchParams,
    searchParams?: PartialSearchParams
  ): SearchParams {
    return searchParams
      ? {
          items: searchParams.items || donor.items,
          extensions: (searchParams.extensions || donor.extensions).map(
            (ext: string) => `.${ext.replace('.', '')}`
          ),
        }
      : donor;
  }

  private static parseCommentParams(
    donor: CommentParams,
    commentParams?: PartialCommentParams
  ): CommentParams {
    return commentParams
      ? {
          enabled: commentParams.enabled || donor.enabled,
          start: commentParams.start || donor.start,
          end: commentParams.end || donor.end,
        }
      : donor;
  }
}
