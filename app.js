const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.port || 3000

const http  = require('http')
const path = require('path')
const socketio  = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)

app.set('views', path.join(__dirname, 'public', 'views'));
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "public")))

io.on("connection", function (socket){
    socket.on("send-location", function(data)   
    {
        io.emit("recieve-location",{id: socket.id, ...data})
    })
    console.log("connected")

    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id)
    })
})

app.get('/', (req,res)=>{
    res.render('index')
})

server.listen(port, ()=>
{

    console.log(`Listenning to port ${port}`)
})