import multer from "multer";

import path from "path";

// ======================================
// STORAGE
// ======================================

const storage =
  multer.diskStorage(
    {
      destination: (
        req,
        file,
        cb
      ) => {
        cb(
          null,
          path.join(
            process.cwd(),
            "src/uploads/reports"
          )
        );
      },

      filename: (
        req,
        file,
        cb
      ) => {
        const uniqueName =
          Date.now() +
          path.extname(
            file.originalname
          );

        cb(
          null,
          uniqueName
        );
      },
    }
  );

// ======================================
// FILE FILTER
// ======================================

const fileFilter = (
  req: any,
  file: any,
  cb: any
) => {
  if (
    file.mimetype ===
    "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only PDF allowed"
      ),

      false
    );
  }
};

// ======================================
// UPLOAD
// ======================================

const upload = multer(
  {
    storage,

    fileFilter,
  }
);

export default upload;