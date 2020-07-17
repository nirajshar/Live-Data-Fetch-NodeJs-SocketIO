exports.get_time_diff = function (datetime) {

    var datetime = typeof datetime !== 'undefined' ? datetime : "2014-01-01 01:02:03.123456";
    var datetime = new Date(datetime).getTime();
    var now = new Date().getTime();

    if (isNaN(datetime)) {
        return "";
    }

    // console.log(datetime + " " + now);

    if (datetime < now) {
        var milisec_diff = now - datetime;
    } else {
        var milisec_diff = datetime - now;
    }

    var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
    var date_diff = new Date(milisec_diff);
    return days + " Days : " + date_diff.getHours() + " Hours : " + date_diff.getMinutes() + " Minutes : " + date_diff.getSeconds() + " Seconds";
}

