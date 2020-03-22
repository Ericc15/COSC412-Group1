const express = require('express');

const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    socket.on('joined', function(handle){
        io.emit('chat message', `\"${handle}\" joined the chat`);
    });
    socket.on('disconnect', function() {
    });
});

server.listen(8080, () => {
    console.log(`Server listening at port ${server.address().port}!`);
});