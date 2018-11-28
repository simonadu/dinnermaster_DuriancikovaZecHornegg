var db = require('../database');
var users = {
  getAllUsers: function(callback) {
    return db.query('select * from user', callback);
  },

  getUserByUser_id: function(id, callback) {
    return db.query('select * from user where id=?', [id], callback);
  },

  getUserByUsername: function(username, callback) {
    return db.query(
      'select * from user where username=?',
      [username],
      callback
    );
  },

  addUser: function(user, password_hash, callback) {
    return db.query(
      'insert into user values(?,?,?,?,?,?,?,?,?,?,?)',
      [
        user.id,
        user.username,
        password_hash,
        user.firstname,
        user.lastname,
        user.phone,
        user.score,
        user.mail,
        user.no_guests,
        user.nationality,
        user.diet
      ],
      callback
    );
  },

  deleteUser: function(id, callback) {
    return db.query('delete from user where id=?', [id], callback);
  },

  updateUser: function(id, user, callback) {
    return db.query(
      'update user set username=?, password=?, fisrtname=?, lastname=?, phone= ?, score=?, mail=?, no_guests=?, nationality=?, diet=? where id=?',
      [
        user.username,
        user.password,
        user.firstname,
        user.lastname,
        user.phone,
        user.score,
        user.mail,
        user.no_guests,
        user.nationality,
        user.diet,
        user.id
      ],
      callback
    );
  }
};
module.exports = users;
