var db = require('../database');
var guests = {

    //user can see who applied to the dinner
    getGuestsByDinner: function (id, callback) {
        return db.query
        ('SELECT user.username, guests.id, guests.user_id, guests.dinner_id, guests.grade FROM guests INNER JOIN user ON guests.user_id=user.id WHERE dinner_id=?', [id], callback);
    },

    //user can see which dinners had he/she applied to
    getVisitedDinners: function (id, callback) {
        return db.query
        ('SELECT dinner.name, user.username, guests.id, dinner.time, dinner.date, guests.user_id, guests.dinner_id, guests.grade FROM guests INNER JOIN dinner ON guests.dinner_id=dinner.id INNER JOIN user ON guests.user_id=user.id WHERE guests.user_id=? AND (dinner.date= current_date AND dinner.time>=current_time) OR dinner.date> current_date ORDER BY dinner.date', [id], callback
        );
    },


    getAlreadyVisitedDinners: function (id, callback) {
        return db.query
        ('SELECT dinner.name, user.username, guests.id, dinner.time, dinner.date, guests.user_id, guests.dinner_id, guests.grade FROM guests INNER JOIN dinner ON guests.dinner_id=dinner.id INNER JOIN user ON guests.user_id=user.id WHERE guests.user_id=? AND (dinner.date= current_date AND dinner.time<current_time) OR dinner.date < current_date ORDER BY dinner.date', [id], callback
        );
    },

    getGuestbyGuestId: function(id, callback) {
        return db.query
        ('SELECT guests.id, guests.user_id, guests.dinner_id, guests.grade, dinner.name, dinner.description, dinner.date, dinner.time, user.username  FROM guests INNER JOIN dinner ON guests.dinner_id=dinner.id INNER JOIN user ON guests.user_id=user.id WHERE guests.id=?', [id], callback)
    },

    addGuest: function (guests, callback) {
        return db.query(
            'INSERT INTO guests values(?,?,?,?)',
            [ guests.id, guests.dinner_id, guests.user_id, guests.grade=0],
            callback
        );
    },

    deleteGuest: function(id, callback) {
        return db.query('DELETE FROM guests WHERE id=?', [id], callback);
    },

    updateGuestGrade: function(id, guests, callback) {
        return db.query(
            'UPDATE guests SET grade=? WHERE id=?',
            [guests.grade, id],
            callback
        );
    },


};
module.exports = guests;