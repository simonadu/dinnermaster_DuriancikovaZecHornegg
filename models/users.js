var db = require('../database');
var users = {
    getAllusers: function(callback) {
        return db.query('select * from user', callback);
    },

    getuserByuser_id: function(id, callback) {
        return db.query('select * from user where id=?', [id], callback);
    },
    adduser: function(user, callback) {
        return db.query(
            'insert into user values(?,?,?,?,?,?,?,?,?,?,?)',
            [ user.id, user.username, user.firstname,user.password, user.lastname, user.phone, user.score, user.mail,
                user.no_guests, user.nationality, user.diet],
            callback
        );
    },

};
module.exports = users;