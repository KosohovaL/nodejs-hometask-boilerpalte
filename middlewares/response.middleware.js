const responseMiddleware = (req, res, next) => {
    // TODO: Implement middleware that returns result of the query

    const initialResJson = res.json;

    res.json = function (data) {

        if (res.statusCode !== 200) {
            arguments[0] = { error: true, message: (res.errorMessage ? res.errorMessage : data) };
        } else {
            arguments[0] = data;
        }
        initialResJson.apply(res, arguments);
    };

    if (res.statusCode !== 200) {
        next(new Error('Some http error status'))
    } else {
        next();
    }
}

const errorJson = (err, req, res, next) => {
    res.json({})

}

exports.responseMiddleware = responseMiddleware;
exports.errorJson = errorJson;