import { IFileService, IListingService } from '../shared/interfaces';
import { ListingParams } from '../shared/types';
import { DEFAULT_LISTING_PARAMS, DIST_PATH } from '../shared/constants';
import { readdir, rm, mkdir, lstat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { isBinaryFile } from 'isbinaryfile';

export default class ListingService implements IListingService {
  private params: ListingParams = DEFAULT_LISTING_PARAMS;

  constructor(private readonly fileService: IFileService) {}

  setParams(params: ListingParams): IListingService {
    console.log(`Preparing ${params.output} listing config...`);
    this.params = params;
    return this;
  }

  private static async checkDistFolder() {
    try {
      await readdir(DIST_PATH);
      return;
    } catch (e) {
      await mkdir(DIST_PATH, { recursive: true });
      return;
    }
  }

  private async deleteOldListing() {
    try {
      await rm(join(DIST_PATH, this.params.output), { recursive: true, force: true });
      return;
    } catch (e) {
      return;
    }
  }

  private async getFileContent(path: string): Promise<string> {
    const pathWithoutRoot: string = path.replace(this.params.root, '');
    let data: string = await this.fileService.read(path, this.params.encoding);
    let divider: string = '';

    console.log(`Coping ${pathWithoutRoot} file content...`);

    for (let i = 0; i <= this.params.paddings; i++) {
      divider += '\n';
    }

    if (this.params.comment.enabled) {
      return (
        this.params.comment.start +
        pathWithoutRoot +
        this.params.comment.end +
        divider +
        data +
        divider
      );
    }

    return divider + data;
  }

  private async investigate(path: string) {
    const items: string[] = await readdir(path);

    for (const item of items) {
      const itemPath: string = join(path, item);

      if (!this.checkFile(itemPath)) continue;

      if ((await lstat(itemPath)).isDirectory()) {
        await this.investigate(itemPath);
        continue;
      }

      if (await isBinaryFile(itemPath)) continue;

      await this.fileService.append(
        join(DIST_PATH, this.params.output),
        this.params.encoding,
        await this.getFileContent(itemPath)
      );
    }
  }

  private checkFile(filePath: string): boolean {
    const extension: string = extname(filePath);
    const name: string = basename(filePath);

    if (
      this.params.strict &&
      (!this.params.only.extensions.includes(extension) || !this.params.only.items.includes(name))
    ) {
      return false;
    }

    return !(
      !this.params.strict &&
      (this.params.ignore.extensions.includes(extension) || this.params.ignore.items.includes(name))
    );
  }

  async create(): Promise<void> {
    await ListingService.checkDistFolder();
    await this.deleteOldListing();
    await this.fileService.write(join(DIST_PATH, this.params.output), this.params.encoding, '');
    await this.investigate(this.params.root);

    console.log(`Listing ${this.params.output} successfully created...`);
  }
}
