const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use((req, res, next) => {
  req.io = io;
  
  return next();
});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(3333, () => {
  console.log('Server stared on port 3333');
});
