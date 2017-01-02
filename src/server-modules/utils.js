export const unless = (paths, middleware) => (req, res, next) => {
    const aMatchingPath = paths.find((path) => path.test(req.path));
    if (Boolean(aMatchingPath)) {
        return next();
    } else {
        return middleware(req, res, next);
    }
};
