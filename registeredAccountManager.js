var sql = require('mssql');
var dbConnection;

var config = {
    server: process.env.WEATHERBOT_HOSTNAME,
    database: process.env.WEATHERBOT_DBNAME,
    user: process.env.WEATHERBOT_DBUSERNAME,
    password: process.env.WEATHERBOT_DBPASSWORD
};

var registeredAccountManager = {};

registeredAccountManager.getAccounts = async function(cityId, units) {

    dbConnection = new sql.ConnectionPool(config);

    var result = await dbConnection.connect()
        .then(getRecordSet)
        .catch(handleConnectionError);

    return result;
};

var getRecordSet = function() {

    var request = new sql.Request(dbConnection);

    var queryResults = request.query(`select "twitterHandle","cityId", "units" from v_twitterhandles`)
        .then(processRecordSet)
        .catch(handleQuerryError);

    return queryResults;
}

var processRecordSet = function(results) {
    dbConnection.close();
    return results.recordset;
}

var handleQuerryError = function(err) {
    console.log(err);
    dbConnection.close();
    return null;
};

var handleConnectionError = function(err) {
    console.log(err);
    return null;
};

module.exports = registeredAccountManager;