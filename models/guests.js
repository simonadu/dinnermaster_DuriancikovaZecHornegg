var db = require('../database');
var guests = {

    getGuestsByDinner: function (id, callback) {
        return db.query ('select guests.user_id from guests where dinner_id=?', [id], callback);
    }


};
module.exports = guests;