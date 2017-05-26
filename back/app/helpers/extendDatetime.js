const moment = require('moment');

const extendDatetime = function (dateTime) {

    dateTime.prototype.format = function() {
        var d = this;
        return moment(d).format('DD/MM/YYYY à HH:mm');
    };
};

module.exports = extendDatetime;