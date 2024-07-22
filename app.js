const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.port || 3000

const http  = require('http')
const socketio  = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)

app.get('/hey', (req,res)=>{
    res.send('HI')
})

server.listen(port, ()=>
{

    console.log(`Listenning to port ${port}`)
})