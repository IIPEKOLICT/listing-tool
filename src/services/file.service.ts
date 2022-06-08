import { appendFile, readFile, writeFile } from 'fs/promises';
import { IFileService } from '../shared/interfaces';

export default class FileService implements IFileService {
  async read(path?: string, encoding?: string): Promise<string> {
    try {
      return (
        await readFile(path || '', { encoding: (encoding as BufferEncoding) || 'utf8' })
      ).toString();
    } catch (e) {
      return '';
    }
  }

  async write(path?: string, encoding?: string, data?: string): Promise<boolean> {
    try {
      await writeFile(path || '', data || '', { encoding: (encoding as BufferEncoding) || 'utf8' });
      return true;
    } catch (e) {
      return false;
    }
  }

  async append(path?: string, encoding?: string, data?: string): Promise<boolean> {
    try {
      await appendFile(path || '', data || '', {
        encoding: (encoding as BufferEncoding) || 'utf8',
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}
