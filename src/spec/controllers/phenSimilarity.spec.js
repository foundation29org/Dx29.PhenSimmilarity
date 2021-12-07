var phenSimilarityCntrl = require('../../controllers/phenSimilarity');
var input = require('./Input/phenSimilarity.json');
var output = require('./Output/phenSimilarity.json');

const INPUT_ALL_KEYS = input.all_keys;
const INPUT_ONLY_REFERENCE = input.only_reference;
const INPUT_ONLY_COMPARE = input.only_compare;
const INPUT_EMPTY_LISTS = input.empty_lists;

const OUTPUT_ALL_KEYS = output.all_keys;
const OUTPUT_ONLY_REFERENCE = output.only_reference;
const OUTPUT_ONLY_COMPARE = output.only_compare;
const OUTPUT_EMPTY_LISTS = output.empty_lists;

const TEST_PHENSIMILARITY_OK = [
    { "type": "Calcule phenSimilarity with all input keys and data", "input": INPUT_ALL_KEYS, "expectedOutput": OUTPUT_ALL_KEYS },
    { "type": "Calcule phenSimilarity without list_compare info provided ", "input": INPUT_ONLY_REFERENCE, "expectedOutput": OUTPUT_ONLY_REFERENCE },
    { "type": "Calcule phenSimilarity without list_reference info provided", "input": INPUT_ONLY_COMPARE, "expectedOutput": OUTPUT_ONLY_COMPARE },
    { "type": "Calcule phenSimilarity without list_reference & list_compare info provided", "input": INPUT_EMPTY_LISTS, "expectedOutput": OUTPUT_EMPTY_LISTS }
]
describe('[PhenSimilarityCntrl Controller]', () => {
    describe('[calculatePhenSimilarity function]', () => {
        describe('[Correct values]', () => {
            function calculatePhenSimilarity(test) {
                it(test.type, async (done) => {
                    var body = test.input;
                    var expectedOutput = test.expectedOutput;
                    var resultPhenSimilarity = await phenSimilarityCntrl.calculatePhenSimilarity(body)
                    var result = resultPhenSimilarity.data;
                    expect(result).toEqual(expectedOutput);
                    done();
                }, 15000);
            }
            for (var test of TEST_PHENSIMILARITY_OK) {
                calculatePhenSimilarity(test);
            }
        });
    });
});