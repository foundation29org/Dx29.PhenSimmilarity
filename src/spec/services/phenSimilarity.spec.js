var phenSimilarityService = require('../../services/phenSimilarity');
var input = require('./Input/phenSimilarity.json');
var output = require('./Output/phenSimilarity.json');

const TOTAL_LIST_OK = input.totalList;
const OUTPUT_TOTAL_LIST_OK = output.totalList;

const TEST_GETTOTALLIST_OK = [
    { "type": "Get total list", "input": TOTAL_LIST_OK, "expectedOutput": OUTPUT_TOTAL_LIST_OK }
]


const GET_PARENTS_OK = input.getParents;
const OUTPUT_GET_PARENTS_OK = output.getParents;

const TEST_GET_PARENTS_OK = [
    { "type": "Get parents", "input": GET_PARENTS_OK, "expectedOutput": OUTPUT_GET_PARENTS_OK }
]

const COMPARE_OK = input.compare;
const OUTPUT_COMPARE_OK = output.compare;

const TEST_COMPARE_OK = [
    { "type": "Compare", "input": COMPARE_OK, "expectedOutput": OUTPUT_COMPARE_OK }
]

describe('[PhenSimilarity Service]', () => {
    describe('[createTotalList function]', () => {
        describe('[Correct values]', () => {
            function createTotalList(test) {
                var list_reference = test.input.list_reference;
                var expectedOutput = test.expectedOutput;
                it(test.type, async (done) => {
                    var totalList = phenSimilarityService.createTotalList(list_reference);
                    expect(totalList.data).toEqual(expectedOutput);
                    done()
                }, 10000);

            }
            for (var test of TEST_GETTOTALLIST_OK) {
                createTotalList(test);
            }
        });
    });
    describe('[getParents function]', () => {
        describe('[Correct values]', () => {
            function getParents(test) {
                var list_reference = test.input.list_reference;
                var expectedOutput = test.expectedOutput;
                it(test.type, async (done) => {
                    var totalList = await phenSimilarityService.getParents(list_reference);
                    expect(totalList.data).toEqual(expectedOutput);
                    done()
                }, 10000);

            }
            for (var test of TEST_GET_PARENTS_OK) {
                getParents(test);
            }
        });
    });
    describe('[compare function]', () => {
        describe('[Correct values]', () => {
            function compare(test) {
                var list_reference = test.input.list_reference;
                var list_compare = test.input.list_compare;
                var list_parentsReference = test.input.list_parentsReference;
                var list_parentsCompare = test.input.list_parentsCompare;
                var list_total = test.input.list_total;
                var expectedOutput = test.expectedOutput;
                it(test.type, async (done) => {
                    var totalList = phenSimilarityService.compare(list_reference, list_compare, list_parentsReference, list_parentsCompare, list_total);
                    expect(totalList.data).toEqual(expectedOutput);
                    done()
                }, 10000);

            }
            for (var test of TEST_COMPARE_OK) {
                compare(test);
            }
        });
    });
});