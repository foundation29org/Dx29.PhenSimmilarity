const config = require('../config');
/**
 * 
 * @api {GET} /v1/version Get version
 * @apiName About
 * @apiGroup Version
 * @apiVersion  1.0.0
 * @apiDescription This method allows to get the version of the microservice
 * 
* 
 * @apiExample {js} Example usage:
 *   this.http.get('http://localhost:8080/api/v1/version')
 *    .subscribe( (res : any) => {
 *      console.log('Result Ok');
 *     }, (err) => {
 *      console.log('Result Ko');
 *      ...
 *     }
 *
 * @apiSuccess {Sring} String The value of the microservice version 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *      "v0.0.01"
 */
function getVersion(req, res) {
    let version = config.version;
    if (version == undefined) {
        return res.status(404).send({ "message": "Not found" });
    }
    return res.status(200).send(config.version);
}


module.exports = {
    getVersion
}