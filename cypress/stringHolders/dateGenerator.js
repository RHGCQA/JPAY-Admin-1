function date_today(){
    var today = new Date();
    var DD = String(today.getDate()).padStart(2, '0');
    var MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var YYYY = today.getFullYear();
    today = YYYY + "-" + MM + "-" + DD;

    return today;
}
module.exports = {date_today};  