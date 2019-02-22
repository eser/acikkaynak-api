function fixExceptionObjectResult(ex) {
    const serialized = JSON.stringify(ex, Object.getOwnPropertyNames(ex));

    return serialized;
}

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
            body: fixExceptionObjectResult(ex),
        }
    }
}

module.exports = lambdaContext;
