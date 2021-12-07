const REQUEST = require("request");
const BASE_URL = "http://localhost:8080"
const config = require('../../config');

describe('[AboutCntrl Controller Requests]', () => {
    describe('[getVersion function]', () => {
        describe('[Correct values]', () => {
            it("Get version", async (done) => {
                const url = BASE_URL + "/api/version";
                var expectedOutput = config.version;
                REQUEST.get(url,
                    function (error, response, body) {
                        var result = body;
                        if (!error) {
                            expect(response.statusCode).toBe(200)
                            expect(result).toEqual(expectedOutput);
                            done();
                        }
                    });
            }, 15000);
        });
    });
});