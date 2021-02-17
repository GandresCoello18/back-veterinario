import multer from 'multer';

export const store_file = () => {
    const storage = multer.diskStorage({
      destination: function (_req: Express.Request, _file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) {
        callback(null, "./public/products");
      },
      filename: function (_req: Express.Request, file: any, callback: any) {
        callback(null, file.originalname);
      },
    });
    const fileFilter = (
      _req: any,
      file: { mimetype: string },
      cb: (arg0: null, arg1: boolean) => void
    ) => {
      if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };
    const upload = multer({
      storage,
      limits: { fileSize: 1024 * 1024 * 5 },
      fileFilter,
    });
    return upload;
  }