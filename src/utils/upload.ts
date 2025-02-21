import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: any
) => {
  const allowedExtensions = [".pdf", ".docx", ".txt", ".json"];
  if (
    !allowedExtensions.includes(path.extname(file.originalname).toLowerCase())
  ) {
    return cb(new Error("Unsupported file format"), false);
  }
  cb(null, true);
};

export const upload = multer({ storage, fileFilter });
