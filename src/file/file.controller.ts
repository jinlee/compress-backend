import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FileValidators } from './validators';
import { FileService } from './file.service';
import { generateContentDisposition, generateContentType } from './helpers';
import { UploadFileDTO } from './dto/uploadFile.dto';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(FileValidators)
    file: Express.Multer.File,
    @Query()
    params: UploadFileDTO,
    @Res() res,
  ) {
    const format = file.mimetype.split('/')[1];
    // console.log('params', params);
    const transformedFileStream = this.fileService.transformFile(
      file.buffer,
      params.format || format,
      params,
    );

    const contentType = params.format
      ? `image/${params.format}`
      : generateContentType(file)['Content-Type'];
    const contentDisposition = params.format
      ? `image/${params?.format}`
      : generateContentDisposition(file)['Content-Disposition'];

    res.set({
      'Content-Type': contentType,
      'Content-Disposition': contentDisposition,
    });

    console.log('file size in mega bytes', file.size / 1000 / 1000);

    // TODO: add calculating of the result file size and compare it with the original file size
    return transformedFileStream.pipe(res);
  }
}
