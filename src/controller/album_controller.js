const { cloudinary_upload_file, cloudinary_remove_file } = require("../config/cloundinary");
const album_model = require("../model/album_model");
const fs = require('fs');

module.exports.add_album = async (req, res) => {
    try {
        const { name, desc, bg_color } = req.body;
        const image_file = req.file
        img_name = image_file.originalname.substring(0, image_file.originalname.length - 4);
        const image_upload = await cloudinary_upload_file(image_file, img_name, 'image', 'stream/album');

        await album_model.insertOne({
            name: name,
            desc: desc,
            bg_color: bg_color,
            image: image_upload.secure_url,
            image_id: image_upload.public_id
        });

        fs.unlink(image_file.path, (err) => {
            if (err) { console.error("Failed to delete image:", err); }
        });

        res.status(200).json({ success: true, message: "adding album to album model success" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'now we get some error from sever at adding album' });
    }
}
module.exports.list_album = async (req, res) => {
    try {
        const album_datas = await album_model.find();
        res.status(200).json({ success: true, album_datas: album_datas });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'we get error from sever at list album data' });
    }
}
module.exports.remove_album = async (req, res) => {
    try {
        const { id } = req.body;
        const item = await album_model.findByIdAndDelete(id);
        await cloudinary_remove_file(item.image_id, 'image');
        res.status(200).json({ success: true, message: 'removed album data' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'we get some error from server at album remove' });
    }
}