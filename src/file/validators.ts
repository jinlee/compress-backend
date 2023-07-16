import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

export const FileValidators = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({
      maxSize: 1000 * 1000 * 10,
      message: 'File too large! Max size is 10MB.',
    }),
    new FileTypeValidator({ fileType: 'image/*' }),
  ],
});
