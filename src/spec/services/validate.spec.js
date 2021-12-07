
var validateService = require('../../services/validate');
var inputValidateBodyJSON = require('./Input/validateBody.json')

const BODY_OK = inputValidateBodyJSON.body_ok;
const BODY_NO_KEYS = inputValidateBodyJSON.body_no_keys;

const TEST_ERRORS_BODY = [
    { "type": "Body has not all json keys", data: BODY_NO_KEYS }
]

describe('[Validate Service]', () => {
    describe('[ValidateBody function]', () => {
        describe('[Correct values]', () => {
            it('Validate function with a correct json input', (done) => {
                var result = validateService.validateBody(BODY_OK[0])
                expect(result.status).toBe(200)
                done();
            })
        })
        describe('[Error values]', () => {
            for (var test_type of TEST_ERRORS_BODY) {
                var inputList = test_type.data;
                it(test_type.type, (done) => {
                    for (var i = 0; i < inputList.length; i++) {
                        var input = inputList[i];
                        var result = validateService.validateBody(input)
                        expect(result.status).toBe(400);
                        done()
                    }
                });
            }
        });
    })
});