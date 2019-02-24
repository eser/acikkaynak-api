const index = require('../index');

describe('dummyCategory', () => {
    test('message check', () => {
        const instance = index({});

        const message = instance.message;

        expect(message).toEqual('Go Serverless v1.0! Your function executed successfully!');
    });
});
