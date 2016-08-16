'use strict';

var MESSAGE_SIZE = 100;

module.exports = function (io) {

    // var chatroom = io.of('/chatroom');

    var users = [];
    var messages = [];

    io.on('connection', function (socket) {

        socket.on('LEAVE_CHATROOM', function (data) {
            io.emit('LEAVE_CHATROOM_ACK', messages);
        });

        socket.on('disconnect', function () {
            socket.broadcast.emit('LEAVE_CHATROOM', {
                username: socket.username
            });
        });

        socket.on('FETCH_ALL_MESSAGE', function () {
            socket.emit('FETCH_ALL_MESSAGE_ACK', messages);
        });

        socket.on('SEND_MESSAGE', function (data) {
            var message = {
                username: data.username,
                message: data.message
            };
            messages.push(message);

            socket.broadcast.emit('NEW_MESSAGE', message);
            socket.emit('SEND_MESSAGE_ACK', {
                success: true
            });
        });

        // socket.on('SEND_IMAGE', function (data) {
        //     io.emit('SEND_MESSAGE_ACK', messages);
        // });

        socket.on('JOIN_IN_CHATROOM', function (username) {
            var isExist = users.find(function (user) {
                return user.username === username;
            });
            if (isExist) {
                io.emit('JOIN_IN_CHATROOM_ACK', {
                    success: false,
                    error: '该用户名已存在'
                });
            }

            users.push({
                username: username
            });
            socket.user = {
                username: username
            };
            socket.broadcast.emit('JOIN_IN_CHATROOM', {
                username: username
            });

            io.emit('JOIN_IN_CHATROOM_ACK', {
                success: true,
                username: username,
                users: users
            });
        });

        //
        // socket.on('TYPING_MESSAGE', function (data) {
        //     io.emit('TYPING_MESSAGE_ACK', messages);
        // });
        //
        // socket.on('STOP_TYPING_MESSAGE', function (data) {
        //     io.emit('STOP_TYPING_MESSAGE_ACK', messages);
        // });
    });

};

