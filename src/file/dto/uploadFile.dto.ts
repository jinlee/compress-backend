import { WebpOptions, FormatEnum, AvailableFormatInfo } from 'sharp';
import {
  IsNumber,
  IsOptional,
  Min,
  Max,
  IsInt,
  IsBoolean,
  IsArray,
  IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { QualityValidators } from './helpers';

// consider using some generation tool to generate this file
export class UploadFileDTO implements WebpOptions {
  /** Quality, integer 1-100 (optional, default 80) */
  @QualityValidators()
  quality?: number | undefined;
  /** Quality of alpha layer, number from 0-100 (optional, default 100) */
  @QualityValidators()
  alphaQuality?: number | undefined;
  /** Use lossless compression mode (optional, default false) */
  @IsOptional()
  @IsBoolean()
  lossless?: boolean | undefined;
  /** Use near_lossless compression mode (optional, default false) */
  @IsOptional()
  @IsBoolean()
  nearLossless?: boolean | undefined;
  /** Use high quality chroma subsampling (optional, default false) */
  @IsOptional()
  @IsBoolean()
  smartSubsample?: boolean | undefined;
  /** Level of CPU effort to reduce file size, integer 0-6 (optional, default 4) */
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(6)
  effort?: number | undefined;
  /** Prevent use of animation key frames to minimise file size (slow) (optional, default false) */
  @IsOptional()
  @IsNumber()
  // hmm
  minSize?: number;
  /** Allow mixture of lossy and lossless animation frames (slow) (optional, default false) */
  @IsOptional()
  @IsBoolean()
  mixed?: boolean;
  /** Force format output, otherwise attempt to use input format (optional, default true) */
  @IsOptional()
  @IsBoolean()
  force?: boolean | undefined;
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(65535)
  /** Number of animation iterations, a value between 0 and 65535. Use 0 for infinite animation. (optional, default 0) */
  loop?: number | undefined;
  /** delay(s) between animation frames (in milliseconds), each value between 0 and 65535. (optional) */
  @IsOptional()
  @IsArray()
  @Transform(({ value = '' }) => {
    return value?.split(',').map((v) => parseInt(v, 10));
  })
  //
  @IsNumber({}, { each: true })
  delay?: number | number[] | undefined;
  //
  @IsOptional()
  @IsEnum({
    avif: 'avif',
    // dz: 'dz',
    // fits: 'fits',
    gif: 'gif',
    heif: 'heif',
    // input: 'input',
    jpeg: 'jpeg',
    jpg: 'jpg',
    // jp2: 'jp2',
    // jxl: 'jxl',
    // magick: 'magick',
    // openslide: 'openslide',
    // pdf: 'pdf',
    png: 'png',
    // ppm: 'ppm',
    // raw: 'raw',
    // svg: 'svg',

    // these two need to be checked
    // tiff: 'tiff',
    // tif: 'tif',

    // v: 'v',
    webp: 'webp',
  })
  format?: keyof FormatEnum | AvailableFormatInfo;
}
