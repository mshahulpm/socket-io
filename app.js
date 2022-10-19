const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3006

const http = require('http').Server(app)
const socket = require('socket.io')
const io = new socket.Server(http, {
    cors: {
        origin: "*"
    }
})

// app.use(cors())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    next()
})

let socketCon;
let id;
io.on('connection', (conn) => {
    if (!id) id = conn.id
    console.log(`⚡: ${conn.id} user just connected`);
    conn.on('disconnect', () => {
        console.log('A user disconnected');
    });

    conn.on('message', (data) => {
        //sends the data to everyone except you.
        conn.broadcast.emit('response', data);

        //sends the data to everyone connected to the server
        // socket.emit("response", data)
    });
});

app.get('/hello/:message', (req, res) => {
    // socket.broadcast.to(id).emit("response", "hey how you do in ?")
    io.to(id).emit("response", req.params)
    res.json({ message: "hello i am here " })
})

app.use(express.static('public'))

app.get('/test', (req, res) => {
    res.json({ message: "working fine" })
})


http.listen(PORT, () => console.log('on ' + PORT))