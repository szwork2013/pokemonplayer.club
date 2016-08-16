'use strict';

var MESSAGE_SIZE = 100;

module.exports = function (io) {

    var chatroom = io.of('/chatroom');

    var users = []; // { username }
    var messages = []; // { username, message }

    chatroom.on('connection', function (socket) {

        // socket.on('LEAVE_CHATROOM', function (data) {
        //     io.emit('LEAVE_CHATROOM_ACK', messages);
        // });

        socket.on('disconnect', function () {
            if (socket.user) {
                users = users.filter(function (user) {
                    return user.username != socket.user.username;
                });
                socket.broadcast.emit('LEAVE_CHATROOM', {
                    username: socket.user.username,
                    users: users
                });
            }
        });

        socket.on('FETCH_ALL_MESSAGE', function () {
            socket.emit('FETCH_ALL_MESSAGE_ACK', messages);
        });

        socket.on('SEND_MESSAGE', function (data) {
            var message = {
                username: socket.user.username,
                message: data.message
            };
            messages.push(message);

            socket.broadcast.emit('NEW_MESSAGE', message);
            socket.emit('NEW_MESSAGE', message);
        });

        // socket.on('SEND_IMAGE', function (data) {
        //     io.emit('SEND_MESSAGE_ACK', messages);
        // });

        socket.on('JOIN_IN_CHATROOM', function (data) {
            var username = data.username;
            var error = null;
            var isExist = users.find(function (user) {
                return user.username === username;
            });

            if (username.length > 8) {
                error = '名字长度须小于8';
            } else if (isExist) {
                error = '该用户名已存在';
            }

            if (error) {
                socket.emit('JOIN_IN_CHATROOM_ACK', {
                    success: false,
                    error: error
                });
                return;
            }

            users.push({
                username: username
            });
            socket.user = {
                username: username
            };
            socket.broadcast.emit('NEW_USER', {
                username: username
            });

            socket.emit('JOIN_IN_CHATROOM_ACK', {
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

