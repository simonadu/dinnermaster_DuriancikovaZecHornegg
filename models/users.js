var db = require('../database');
var users = {
    getAllusers: function(callback) {
        return db.query('select * from user', callback);
    },

    getuserByuser_id: function(id, callback) {
        return db.query('select * from users where id=?', [id], callback);
    },
    adduser: function(users, callback) {
        return db.query(
            'insert into users values(?,?,?,?,?,?,?,?,?)',
            [users.username, users.firstname, users.lastname, users.phone, users.score, users.mail, users.no_guests, users.nationality, users.diet],
            callback
        );
    },

};
module.exports = users;