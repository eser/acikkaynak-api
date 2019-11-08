const indexAction = require('../index').action;

describe('dummyCategory', () => {
    test('message check', async () => {
        const instance = await indexAction({});

        expect(instance.message).toEqual('Go Serverless v1.0! Your function executed successfully!');
    });
});
