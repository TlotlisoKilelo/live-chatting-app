const io = require('socket.io')(3000, {
    // Allow browser pages served from file:// or other origins to connect while
    // developing locally. For production lock this down to specific origins.
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
const users = {}

io.on('connection', socket => {
    socket.on('new user', name => {
        users[socket.id] = name;
         socket.broadcast.emit('user-connected', name)
    });
    socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id]});

    });
   socket.on('disconnected'  , () => {
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id]
   })
});
