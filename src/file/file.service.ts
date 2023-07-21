import { Injectable } from '@nestjs/common';
import sharp from 'sharp';

@Injectable()
export class FileService {
  transformFile(buffer: Buffer, format, params) {
    return sharp(buffer).toFormat(format, params);
  }
}
