const express = require('express');
const song_controll = require('../controller/song_controller');
const upload = require('../middleware/multer');

const song_router = express.Router();

song_router.post('/add', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), song_controll.add_track);
song_router.get('/list', song_controll.list_track);
song_router.post('/remove', song_controll.remove_track);
module.exports = song_router;
