function action(input) {
    const result = {
        message: 'Go Serverless v1.0! Your function executed successfully!',
    };

    if (process.env.ENVIRONMENT !== 'production') {
        result.input = input;
        result.env = process.env;
    }

    return result;
}

module.exports = {
    'default': action,
};
