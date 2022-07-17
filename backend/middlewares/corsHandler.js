module.exports.corsHandler = (req, res, next) => {
  const allowedURL = [
    "http://front15meyer985.nomoredomains.xyz/",
    "http://www.front15meyer985.nomoredomains.xyz/",
  ];
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers["access-control-request-headers"];

  if (allowedURL.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);
    return res.end();
  }

  next();
};
