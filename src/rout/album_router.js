const express = require('express');
const al_controll = require('../controller/album_controller');
const upload = require('../middleware/multer');

const album_router = express.Router();

album_router.post('/add', upload.single('album_img'), al_controll.add_album);
album_router.get('/list', al_controll.list_album);
album_router.post('/remove', al_controll.remove_album);
module.exports = album_router;
