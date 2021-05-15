const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 8000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

let user = "";

app.post("/create-user", (req, res) => {
    user = req.body.username;
    res.sendFile(__dirname + '/chat.html');
});

io.of("/create-user").on('connection', socket => {
    console.log("Connected...");

    socket.emit("username", user);

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
        //console.log(msg);
    })
})
