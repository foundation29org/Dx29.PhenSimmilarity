var apif29bioService = require('./apif29bio')

var Enum = require('enum');
var Similarity = new Enum({ 'Equal': "Equal", 'Successor': "Successor", 'Predecessor': "Predecessor", 'None': "None" });

function createTotalList(list) {
    var result = { status: 200, data: [], message: "Create total list OK" }
    let totalList = new Object();
    totalList = {};
    for (var i = 0; i < list.length; i++) {
        totalList[list[i]] = {};
    }
    totalList["others"] = {};
    result.data = totalList;
    return result;
}

function getParents(list) {
    return new Promise(async function (resolve, reject) {
        var result = { status: 200, data: [], message: "Get parents OK" }

        let parentsInfoExe = await apif29bioService.getSPredecessors(list, -1);
        if (parentsInfoExe.status != 200) return resolve(parentsInfoExe);
        let parentsDataList = parentsInfoExe.data;
        let resultList = {}
        for (var id in parentsDataList) {
            var resultParentsList = [];
            var parentDataInfo = parentsDataList[id];
            findKeys(parentDataInfo, resultParentsList);
            for (var i = 0; i < resultParentsList.length; i++) {
                resultList[resultParentsList[i]] = id;
            }
        }
        result.data = resultList;
        return resolve(result);
    });
}

function findKeys(obj, resultParentsList) {
    for (var key in obj) {
        resultParentsList.push(key)
    }
    for (var key in obj) {
        var infoParent = obj[key];
        if (infoParent != undefined) {
            findKeys(infoParent, resultParentsList);
        }
    }
    return resultParentsList;
}

function compare(list1, list2, parentsList1, parentsList2, totalList) {
    var result = { status: 200, data: [], message: "Compare lists OK" }

    var list2YetChecked = [];

    for (var i = 0; i < list1.length; i++) {
        var id1 = list1[i];
        // Symptom from 1 is included in 2
        if (list2.includes(id1) == true) {
            list2YetChecked.push(id1);
            totalList[id1][id1] = { "Similarity": Similarity.Equal.value, "Score": 100 };
        }
        // Symptom from 1 is included in predeccessor list of 2 
        for (var id2 in parentsList2) {
            if (id1 == id2) {
                list2YetChecked.push(parentsList2[id2]);
                totalList[id1][parentsList2[id2]] = { "Similarity": Similarity.Predecessor.value, "Score": 50 };
            }
        }
    }

    // Predeccessor from 1 is included in 2
    for (var i = 0; i < list2.length; i++) {
        var id2 = list2[i];
        if (list2YetChecked.includes(id2) == false) {
            for (var id1 in parentsList1) {
                if (id2 == id1) {
                    list2YetChecked.push(id2);
                    totalList[parentsList1[id1]][id2] = { "Similarity": Similarity.Successor.value, "Score": 50 };
                }
            }
        }
    }

    // From 2 not included in 1 and not predeccessors
    for (var i = 0; i < list2.length; i++) {
        var id2 = list2[i];
        if (list2YetChecked.includes(id2) == false) {
            totalList["others"][id2] = { "Similarity": Similarity.None.value, "Score": 0 }
        }
    }

    result.data = totalList;
    return result;
}

function transformDictionaryToList(totalList) {
    var result = { status: 200, data: [], message: "Compare lists OK" }
    let resultList = [];
    for (var idPatient in totalList) {
        if (idPatient != "others") {
            if (Object.keys(totalList[idPatient]).length == 0) {
                resultList.push({ "Id": idPatient, "HasPatient": true, "HasDisease": false, "Relationship": Similarity.None.value, "RelatedId": null, "Score": 0 });
            }
            else {
                for (var idDisease in totalList[idPatient]) {
                    // if idPatient and idDisease Similarity = Equal: Add.
                    if (totalList[idPatient][idDisease].Similarity == Similarity.Equal.value) {
                        resultList.push({ "Id": idPatient, "HasPatient": true, "HasDisease": true, "Relationship": totalList[idPatient][idDisease].Similarity, "RelatedId": idDisease, "Score": totalList[idPatient][idDisease].Score });
                    }
                    // idPatient: only check HasDisease if this symptom is one of any Predeccessor of the disease symptoms. symptom relation is predeccessor 
                    if (totalList[idPatient][idDisease].Similarity == Similarity.Predecessor.value) {
                        var yetAddedAsEqual = false;
                        for (var i = 0; i < resultList.length; i++) {
                            var diseaseAdded = resultList[i];
                            if ((diseaseAdded.Id == idPatient) && (diseaseAdded.Relationship == Similarity.Equal.value)) {
                                yetAddedAsEqual = true;
                            }
                        }
                        if (yetAddedAsEqual == false) {
                            resultList.push({ "Id": idPatient, "HasPatient": true, "HasDisease": true, "Relationship": totalList[idPatient][idDisease].Similarity, "RelatedId": idDisease, "Score": totalList[idPatient][idDisease].Score });
                        }
                        var yetAddedAsEqualDisease = false;
                        for (var i = 0; i < resultList.length; i++) {
                            var diseaseAdded = resultList[i];
                            if ((diseaseAdded.Id == idDisease) && (diseaseAdded.Relationship == Similarity.Equal.value)) {
                                yetAddedAsEqualDisease = true;
                            }
                        }
                        if (yetAddedAsEqualDisease == false) {
                            resultList.push({ "Id": idDisease, "HasPatient": false, "HasDisease": true, "Relationship": totalList[idPatient][idDisease].Similarity, "RelatedId": idPatient, "Score": totalList[idPatient][idDisease].Score });
                        }
                    }
                    // idDisease: only check HasPatient if this symptom is one of any Predeccessor of the patient symptoms. symptom relation is Successor
                    if (totalList[idPatient][idDisease].Similarity == Similarity.Successor.value) {
                        var yetAddedAsEqual = false;
                        for (var i = 0; i < resultList.length; i++) {
                            var diseaseAdded = resultList[i];
                            if ((diseaseAdded.Id == idDisease) && (diseaseAdded.Relationship == Similarity.Equal.value)) {
                                yetAddedAsEqual = true;
                            }
                        }
                        if (yetAddedAsEqual == false) {
                            resultList.push({ "Id": idDisease, "HasPatient": true, "HasDisease": true, "Relationship": totalList[idPatient][idDisease].Similarity, "RelatedId": idPatient, "Score": totalList[idPatient][idDisease].Score });
                        }
                        var yetAddedAsEqualPatient = false;
                        for (var i = 0; i < resultList.length; i++) {
                            var diseaseAdded = resultList[i];
                            if ((diseaseAdded.Id == idPatient) && (diseaseAdded.Relationship == Similarity.Equal.value)) {
                                yetAddedAsEqualPatient = true;
                            }
                        }
                        if (yetAddedAsEqualPatient == false) {
                            resultList.push({ "Id": idPatient, "HasPatient": true, "HasDisease": false, "Relationship": totalList[idPatient][idDisease].Similarity, "RelatedId": idDisease, "Score": totalList[idPatient][idDisease].Score });
                        }
                    }
                }
            }
        }
        else {
            for (var idDisease in totalList[idPatient]) {
                resultList.push({ "Id": idDisease, "HasPatient": false, "HasDisease": true, "Relationship": totalList[idPatient][idDisease].Similarity, "RelatedId": null, "Score": totalList[idPatient][idDisease].Score });
            }
        }
    }
    result.data = resultList;
    return result;
}

module.exports = {
    createTotalList,
    getParents,
    compare,
    transformDictionaryToList
}