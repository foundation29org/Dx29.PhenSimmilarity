var request = require('request');
const config = require('../config');

function getSPredecessors(list_symptoms_ids, depth) {
    return new Promise(function (resolve, reject) {
        request({
            method: 'POST',
            url: config.f29bio + '/api/v1/Phenotype/predecessors?depth=' + depth,
            body: list_symptoms_ids,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return resolve({ status: response.statusCode, data: body, message: "get predecessors of symptoms OK" })
            }
            else if (response.statusCode != 200) {
                resolve({ status: response.statusCode, data: [], message: body })
            }
            else if (error) {
                return resolve({ status: response.statusCode, data: [], message: error })
            }
        })
    });
}

module.exports = {
    getSPredecessors
}