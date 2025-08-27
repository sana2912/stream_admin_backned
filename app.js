const express = require('express');
const cors = require('cors');
const connnect_database = require('./src/config/mogodb');
const song_router = require('./src/rout/song_router');
const album_router = require('./src/rout/album_router');

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// {
//     origin: 'http://localhost:5173',
//     credentials: true,
// })

connnect_database();


app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Streaming Backend</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      text-align: center;
      padding: 20px;
    }
    h1 {
      font-size: 3rem;
      margin-bottom: 15px;
      font-weight: 600;
    }
    p {
      font-size: 1.3rem;
      margin-bottom: 40px;
      opacity: 0.9;
    }
    .button-container {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
      justify-content: center;
    }
    a.button {
      display: inline-block;
      padding: 14px 28px;
      font-size: 1.1rem;
      color: #764ba2;
      background-color: white;
      border-radius: 50px; /* More rounded corners */
      text-decoration: none;
      font-weight: bold;
      transition: all 0.3s ease;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
    a.button:hover {
      background-color: #f0f4f8;
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    }
  </style>
</head>
<body>
  <h1>🎵 Streaming Backend (admin)</h1>
  <p>Your backend is running smoothly 🚀</p>
  <div class="button-container">
    <a href="https://stream-admin.netlify.app" class="button" target="_blank">
      frontend page
    </a>
    <a href="https://github.com/sana2912/stream_admin_backned.git" class="button" target="_blank">
      Project Repository
    </a>
    <a href="https://github.com/sana2912/stream_admin_ui.git" class="button" target="_blank">
      Frontend Repository
    </a>
  </div>
</body>
</html>
        `)
})
//  track router 
app.use('/helpCheck', (req, res) => { res.status(200).send('ok') });
app.use('/api/track', song_router);
app.use('/api/album', album_router);

app.listen(port, (req, res) => {
    console.log('now sever is started');
})
