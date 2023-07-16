export const generateContentType = (file: Express.Multer.File) => ({
  'Content-Type': file.mimetype,
});
export const generateContentDisposition = (file: Express.Multer.File) => ({
  'Content-Disposition': `attachment; filename="${file.originalname}"`,
});
