const multer = require('multer');
const path = require('path');

const userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, "../../public/images/iconosUsuarios"))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})
const userIconsUpload = multer({storage: userStorage});
module.exports = userIconsUpload;