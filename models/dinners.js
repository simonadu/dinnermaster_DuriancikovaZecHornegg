var db = require('../database');
var dinners = {

    getAlldinners: function(callback) {
        return db.query('SELECT user.username, dinner.name, dinner.description, dinner.diet,  dinner.time,  dinner.date, dinner.address, dinner.no_plates, dinner.no_guests FROM dinner INNER JOIN user ON dinner.user_id=user.id ORDER BY date ', callback)
    },

    getdinnerBydinner_id: function(id, callback) {
        return db.query('SELECT user.username, dinner.name, dinner.description, dinner.diet,  dinner.time,  dinner.date, dinner.address, dinner.no_plates, dinner.no_guests FROM dinner INNER JOIN user ON dinner.user_id=user.id WHERE dinner.id=? ', [id], callback)
    },

    getdinnersByuser_id: function (id, callback){
        return db.query('SELECT * FROM dinner WHERE user_id=?', [id], callback)
    },

    getUpToDateDinners:function (callback) {
        return db.query('SELECT user.username, dinner.name, dinner.description, dinner.diet,  dinner.time, dinner.date, dinner.address, dinner.no_plates, dinner.no_guests FROM dinner INNER JOIN user ON dinner.user_id=user.id  WHERE (date= current_date AND time>=current_time) OR date> current_date ', callback)
    },

    adddinner: function(dinner, callback) {
        return db.query(
            'INSERT INTO dinner VALUES(?,?,?,?,?,?,?,?,?,?)',
            [   dinner.id, dinner.user_id, dinner.no_plates ,dinner.no_guests=0, dinner.diet,
                dinner.time, dinner.date, dinner.address, dinner.description, dinner.name],
            callback
        );
    },

    deletedinner: function(id, callback) {
        return db.query('DELETE FROM dinner WHERE id=?', [id], callback);
    },

    updatedinner: function(id, dinner, callback) {
        return db.query(
            'UPDATE dinner SET user_id=?, no_plates=?, no_guests=?, diet=?, time= ?, date=?, address=?, description=?, name=? WHERE id=?',
            [   dinner.user_id, dinner.no_plates ,dinner.no_guests, dinner.diet,
                dinner.time, dinner.date, dinner.address, dinner.description, dinner.id, dinner.name
            ],
            callback
        );
    },

    addGuest: function (id, dinner, callback) {
        return db.query('UPDATE dinner SET no_guests= CASE WHEN no_guests < no_plates THEN no_guests+1 ELSE no_plates END WHERE id=?',[id], callback);
    }

};
module.exports = dinners;