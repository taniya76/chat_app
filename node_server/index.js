var express = require('express');
const io = require('Socket.io')(8000);


const users = {}

io.on('connection', socket => {
    socket.on('new-user joined', name => {
        console.log('new user', name);
        users[socket.id] = name;
        socket.broadcast.emit(`user-joined`, name);
    });
   
    socket.on('send', message => {
        socket.broadcast.emit(`receive`, { message: message, name: users[socket.id] })
    })
    socket.on('disconnect', message => {
        socket.broadcast.emit(`leave`, users[socket.id]);
        delete users[socket.id];
    })
    
})