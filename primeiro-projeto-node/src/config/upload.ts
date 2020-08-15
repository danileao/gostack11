import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const pathFile = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: pathFile,
  storage: multer.diskStorage({
    destination: pathFile,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
