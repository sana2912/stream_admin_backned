const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        // check field name that we set for uour file for devide the destination
        if (file.fieldname === 'image') {
            callback(null, './stream/image');
        } else if (file.fieldname === 'audio') {
            callback(null, './stream/audio');
        } else if (file.fieldname === 'album_img') {
            callback(null, './stream/album');
        } else {
            callback(new Error('Invalid file field'), null);
        }
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname) //ให้ใช้ชื่อไฟล์ original เป็นชื่อหลังอัพโหลด
    },
})

const upload = multer({ storage })

module.exports = upload;