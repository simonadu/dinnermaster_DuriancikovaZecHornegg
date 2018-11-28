var db = require('../database');
var users = {
    getAllUsers: function(callback) {
        return db.query('SELECT * FROM USER', callback);
    },

    getUserByUser_id: function(id, callback) {
        return db.query('SELECT * FROM user WHERE id=?', [id], callback);
    },

    getUserByUsername: function(username, callback) {
        return db.query('SELECT * FROM user WHERE username=?', [username], callback);
    },

    addUser: function(user, password_hash, callback) {
        return db.query(
            'INSERT INTO user VALUES(?,?,?,?,?,?,?,?,?,?,?)',
            [   user.id, user.username, password_hash, user.firstname, user.lastname,
                user.phone, user.score, user.mail,
                user.no_guests, user.nationality, user.diet],
            callback
        );
    },

    deleteUser: function(id, callback) {
        return db.query('DELETE FROM user WHERE id=?', [id], callback);
    },

    updateUser: function(id, user, callback) {
        return db.query(
            'UPDATE user SET username=?, password=?, fisrtname=?, lastname=?, phone= ?, score=?, mail=?, no_guests=?, nationality=?, diet=? where id=?',
            [   user.username, user.password, user.firstname, user.lastname,
                user.phone, user.score, user.mail,
                user.no_guests, user.nationality, user.diet, user.id],
            callback
        );
    },

    //increment users number of guests
    updateUserGuests: function (id, user, callback) {
        return db.query(
            'UPDATE user SET no_guests= no_guests+1 WHERE id=?',[id], callback);
    },

};
module.exports = users;