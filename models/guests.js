var db = require('../database');
var guests = {

    //user can see who applied to the dinner
    getGuestsByDinner: function (id, callback) {
        return db.query
        ('SELECT user.username, guests.grade FROM guests INNER JOIN user ON guests.user_id=user.id WHERE dinner_id=?', [id], callback);
    },

    //user can see which dinners had he/she applied to
    getVisitedDinners: function (id, callback) {
        return db.query
        ('SELECT dinner.name FROM guests INNER JOIN dinner ON guests.dinner_id=dinner.id WHERE guests.user_id=?', [id], callback
        );
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