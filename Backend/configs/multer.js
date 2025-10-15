import multer from "multer";
import path from "path";

export default multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});