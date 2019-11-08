function fixExceptionObjectResult(ex) {
    const serialized = JSON.stringify(ex, Object.getOwnPropertyNames(ex));

    return serialized;
}

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

async function lambdaContext(func) {
    try {
        const result = await func();

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: result !== undefined ?
                JSON.stringify(result) :
                undefined,
        };
    }
    catch (ex) {
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: fixExceptionObjectResult(ex),
        };
    }
}

module.exports = lambdaContext;
