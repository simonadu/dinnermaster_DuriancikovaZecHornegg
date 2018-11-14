var db = require('../database');
var dinners = {
    getAlldinners: function(callback) {
        return db.query('select user.username, dinner.description, dinner.diet, dinner.date,  dinner.time,  dinner.address, dinner.no_plates, dinner.no_guests from dinner inner join user ON dinner.user_id=user.id ', callback)
    },

    getdinnerBydinner_id: function(id, callback) {
        return db.query('select user.username, dinner.description, dinner.diet, dinner.date,  dinner.time,  dinner.address, dinner.no_plates, dinner.no_guests from dinner inner join user ON dinner.user_id=user.id where dinner.id=? ', [id], callback)
    },

    adddinner: function(dinner, callback) {
        return db.query(
            'insert into dinner values(?,?,?,?,?,?,?,?,?)',
            [   dinner.id, dinner.user_id, dinner.no_plates ,dinner.no_guests, dinner.diet,
                dinner.time, dinner.date, dinner.address, dinner.description],
            callback
        );
    },

    deletedinner: function(id, callback) {
        return db.query('delete from dinner where id=?', [id], callback);
    },

    updatedinner: function(id, dinner, callback) {
        return db.query(
            'update dinner set user_id=?, no_plates=?, no_guests=?, diet=?, time= ?, date=?, address=?, description=? where id=?',
            [   dinner.user_id, dinner.no_plates ,dinner.no_guests, dinner.diet,
                dinner.time, dinner.date, dinner.address, dinner.description, dinner.id
            ],
            callback
        );
    }

};
module.exports = dinners;