var db = require('../database');
var users = {
    getAllusers: function(callback) {
        return db.query('select * from user', callback);
    },

    getuserByuser_id: function(id, callback) {
        return db.query('select * from user where id=?', [id], callback);
    },

    getdinnerByuser_id:function(id, callback) {
        return db.query('select ')
    },

    adduser: function(user, password, callback) {
        return db.query(
            'insert into user values(?,?,?,?,?,?,?,?,?,?,?)',
            [ user.id, user.username, password, user.firstname, user.lastname,
                user.phone, user.score, user.mail,
                user.no_guests, user.nationality, user.diet],
            callback
        );
    },

    deleteuser: function(id, callback) {
        return db.query('delete from user where id=?', [id], callback);
    },

    updateuser: function(id, user, callback) {
        return db.query(
            'update user set username=?, password=?, fisrtname=?, lastname=?, phone= ?, score=?, mail=?, no_guests=?, nationality=?, diet=? where id=?',
            [   user.username, user.password, user.firstname, user.lastname,
                user.phone, user.score, user.mail,
                user.no_guests, user.nationality, user.diet, user.id],
            callback
        );
    }

};
module.exports = users;