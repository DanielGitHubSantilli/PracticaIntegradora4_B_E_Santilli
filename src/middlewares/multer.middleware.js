import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
      destination: (req, file, cb) => {
            let dir = '';
            switch (file.fieldname) {
                  case 'profile':
                        dir = './uploads/profiles';
                        break;
                  case 'product':
                        dir = './uploads/products';
                        break;
                  case 'documents':
                        dir = './uploads/documents';
                        break;
            }
            cb(null, dir);
      },
      filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
});

const upload = multer({
      storage: storage
});

export default upload;