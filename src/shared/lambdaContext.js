async function lambdaContext(func) {
    try {
        const result = await func();

        return {
            statusCode: 200,
            body: result !== undefined ?
                JSON.stringify(result) :
                undefined,
        };
    }
    catch (ex) {
        return {
            statusCode: 500,
            body: ex.getMessage(),
        }
    }
}

module.exports = lambdaContext;
