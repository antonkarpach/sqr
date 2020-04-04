module.exports = server => {
  let io = require('socket.io').listen(server);
  io.on('connection', socket => {
    socket.on('update user', ({ user }) => {
      if(user) io.to(user.id).emit('update user');
      else socket.emit('update user');
    });
    socket.on('auth', ({ id }) => {
      socket.join(id);
    });
    socket.on('update company', () => {
      io.emit('update company');
    });
  });
};