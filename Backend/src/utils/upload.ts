import multer from "multer";

import path from "path";

import fs from "fs";

// ======================================
// CREATE FOLDER IF NOT EXISTS
// ======================================

const uploadPath =
  path.join(
    process.cwd(),
    "src/uploads/reports"
  );

if (
  !fs.existsSync(
    uploadPath
  )
) {
  fs.mkdirSync(
    uploadPath,
    {
      recursive: true,
    }
  );
}

// ======================================
// STORAGE
// ======================================

const storage =
  multer.diskStorage({
    destination: (
      req,
      file,
      cb
    ) => {
      cb(
        null,
        uploadPath
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
  });

// ======================================
// FILE FILTER
// ======================================

const fileFilter = (
  req: any,
  file: any,
  cb: any
) => {

  // PDF FILE

  if (
    file.mimetype ===
    "application/pdf"
  ) {

    cb(null, true);
  }

  // IMAGE FILE

  else if (
    file.mimetype.startsWith(
      "image/"
    )
  ) {

    cb(null, true);
  }

  // INVALID FILE

  else {

    cb(
      new Error(
        "Only PDF and Image allowed"
      ),

      false
    );
  }
};

// ======================================
// MULTER
// ======================================

const upload = multer({
  storage,
  fileFilter,
});

export default upload;