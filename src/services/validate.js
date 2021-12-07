function validateBody(body) {
    var result = { status: 200, message: "Validate body OK" };
    let error = false;
    messageItems = [];
    if (body.list_reference == undefined) {
        error = true;
        messageItems.push("You must provide list_reference item with a list of symptoms")
    }
    else {
        if (Array.isArray(body.list_reference) == false) {
            error = true;
            messageItems.push("list_reference must be an Array Object");
        }
    }
    if (body.list_compare == undefined) {
        error = true;
        messageItems.push("You must provide list_compare item with a list of symptoms");
    }
    else {
        if (Array.isArray(body.list_compare) == false) {
            error = true;
            messageItems.push("list_compare must be an Array Object");
        }
    }
    if (error) {
        result.status = 400;
        result.message = messageItems;
    }
    return result;
}


module.exports = {
    validateBody
}