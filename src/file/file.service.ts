import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { WebpOptions } from 'sharp';

@Injectable()
export class FileService {
  transformFile(buffer: Buffer, format, params: WebpOptions) {
    return sharp(buffer).toFormat(format, params);
  }
}
