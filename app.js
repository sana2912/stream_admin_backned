const express = require('express');
const cors = require('cors');
const connnect_database = require('./src/config/mogodb');
const song_router = require('./src/rout/song_router');
const album_router = require('./src/rout/album_router');

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

connnect_database();


//  track router 
app.use('/api/track', song_router);
app.use('/api/album', album_router);

app.listen(port, (req, res) => {
    console.log('now sever is started');
})
