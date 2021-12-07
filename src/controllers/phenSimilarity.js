const validateService = require('../services/validate');
const phenSimilarityService = require('../services/phenSimilarity');
/**
 * 
 * @api {POST} /v1/calculate Calcule phenotype simmilarity
 * @apiName Compare symptoms
 * @apiGroup PhenSimmilarity
 * @apiVersion  1.0.0
 * @apiDescription This method allows to compare a list of symptoms with another
 * 
 * @apiExample {js} Example usage:
 *   var body = {"list_reference":["HP:0001250"],"list_compare":[]}
 *   this.http.post('http://localhost:8080/api/v1/calculate',body)
 *    .subscribe( (res : any) => {
 *      console.log('Result Ok');
 *     }, (err) => {
 *      console.log('Result Ko');
 *      ...
 *     }
 * @apiSuccess {List} List A list with all symptoms and the information about the comparision with the list to compare.
 * @apiError Json BodyFormat Body must be a json with list_reference and list_compare keys, and both keys must have array values
 * @apiError Json BodyRequest Request with not correct body
 * @apiErrorExample {json} Error-Response: Request with not correct body: null
 * HTTP/1.1 400 Bad Request
 *     Invalid Request data: SyntaxError: Unexpected token n in JSON at position 0
 * 
 * @apiErrorExample {json} Error-Response: Request with not correct body format: send json instead of a list
 * HTTP/1.1 400 Bad Request
 *      {
 *          "message": [
 *              "You must provide list_reference item with a list of symptoms",
 *              "You must provide list_compare item with a list of symptoms"
 *          ]
 *      }
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * [
 *    {
 *        "Id": "HP:0009115",
 *        "HasPatient": true,
 *        "HasDisease": false,
 *        "Relationship": "None",
 *        "RelatedId": null,
 *        "Score": 0
 *    },
 *    {
 *        "Id": "HP:0040064",
 *        "HasPatient": false,
 *        "HasDisease": true,
 *        "Relationship": "None",
 *        "RelatedId": null,
 *        "Score": 0
 *    }
 *]
 *
 */
 async function calculate(req, res) {
    let body = req.body;

    var validBody = validateService.validateBody(body)
    if (validBody.status != 200) {
        return res.status(validBody.status).send({ message: validBody.message });
    }

    var result = await calculatePhenSimilarity(body);
    if (result.status != 200) {
        return res.status(result.status).send({ message: result.message });
    }

    return res.status(result.status).send(result.data);

}

function calculatePhenSimilarity(body) {
    return new Promise(async function (resolve, reject) {
        var result = { status: 200, data: [], message: "Calculate phen simimarity OK" }

        let list_reference = body.list_reference;
        let list_compare = body.list_compare;
        if((list_reference==undefined)||(list_reference==null)||(list_compare==undefined)||(list_compare==null)){
            return resolve(result);
        }

        // Check if any list is empty
        if ((list_reference.length == 0) || (list_compare.length == 0)) {
            result.message = "There are no symptoms to compare";
            return resolve(result);
        }
        // Step 1: Total List
        let totalListExe = phenSimilarityService.createTotalList(list_reference);
        if (totalListExe.status != 200) return resolve(totalListExe);
        let totalList = totalListExe.data;

        // Step 2: Get parents
        let parents_list_reference_Exe = await phenSimilarityService.getParents(list_reference);
        if (parents_list_reference_Exe.status != 200) return resolve(parents_list_reference_Exe);
        let parents_list_reference = parents_list_reference_Exe.data;

        let parents_list_compare_Exe = await phenSimilarityService.getParents(list_compare);
        if (parents_list_compare_Exe.status != 200) return resolve(parents_list_compare_Exe);
        let parents_list_compare = parents_list_compare_Exe.data;

        // Step 3: Compare
        let compareExe = phenSimilarityService.compare(list_reference, list_compare, parents_list_reference, parents_list_compare, totalList);
        if (compareExe.status != 200) return resolve(compareExe);

        // Step 4: Dictionary to list
        let transformExe = phenSimilarityService.transformDictionaryToList(totalList);
        if (transformExe.status != 200) return resolve(transformExe);
        result.data = transformExe.data;


        return resolve(result);

    });
}
module.exports = {
    calculate,
    calculatePhenSimilarity
}