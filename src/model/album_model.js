// use this file to create model that keep album data

const mongoose = require('mongoose');

const Album_schema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    bg_color: { type: String, required: true },
    image: { type: String, required: true },
    image_id: { type: String }
}, { collection: 'album_data' })

// if not album model , creat album model 
const album_model = mongoose.model('album_model', Album_schema);
module.exports = album_model;