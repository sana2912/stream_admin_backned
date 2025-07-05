const { cloudinary_upload_file, cloudinary_remove_file } = require("../config/cloundinary");
const track_model = require("../model/track_model");
const fs = require('fs');


module.exports.add_track = async (req, res) => {
    try {
        const { name, desc, album } = req.body;
        const image = req.files['image'][0];
        const audio = req.files['audio'][0];
        img_name = image.originalname.substring(0, image.originalname.length - 4);
        audio_name = audio.originalname.substring(0, audio.originalname.length - 4);
        const image_upload = await cloudinary_upload_file(image, img_name, 'image', 'stream/img');
        const audio_upload = await cloudinary_upload_file(audio, audio_name, 'video', 'stream/audio');
        const duration = `${Math.floor(audio_upload.duration / 60)}.${Math.floor(audio_upload.duration % 60)}`;

        await track_model.insertOne({
            name: name,
            desc: desc,
            album: album,
            image: image_upload.secure_url,
            image_id: image_upload.public_id,
            audio: audio_upload.secure_url,
            audio_id: audio_upload.public_id,
            duration: duration,
        });

        fs.unlink(image.path, (err) => {
            if (err) { console.error("Failed to delete image:", err); }
        });
        fs.unlink(audio.path, (err) => {
            if (err) { console.error("Failed to delete image:", err); }
        });

        res.status(200).json({ success: true, message: 'adding data to track model succes' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "we get some err from sever" });
    }
};

module.exports.list_track = async (req, res) => {
    try {
        const track_data = await track_model.find();
        res.status(200).json({ sucess: true, track_data: track_data });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "we get some err from sever" });
    }
};

module.exports.remove_track = async (req, res) => {
    try {
        const { id } = req.body;
        const item = await track_model.findByIdAndDelete(id);
        await cloudinary_remove_file(item.image_id, 'image');
        await cloudinary_remove_file(item.audio_id, 'video');
        res.status(200).json({ success: true, message: 'remove data at track_data success' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'we get erro from sever at remove song' });
    }
}
