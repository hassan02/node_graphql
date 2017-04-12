const { tester } = require('graphql-tester');
const entries = require('/data');
describe("Graph QL API ", function() {
    before(function() {
        // Setup database

    })

    const test = tester({
        url: 'http://localhost'
    });

    it("should fetch all event", function(done) {
        makeGetRequest('/', null, function(err, res) {
            console.log(err)
            expect(res.text).toEqual("Backend Running");
            done();
        });
    })
});