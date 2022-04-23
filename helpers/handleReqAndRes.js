// dependencies
const { StringDecoder } = require("string_decoder");
const url = require("url");
const { notFound } = require("../handlers/routeHandler/notFound");
const routes = require("../routes");
const { parseJSON } = require("./utilities");

// module scaffolding
const handler = {};

handler.handleReqAndRes = (req, res) => {
  // req handling

  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const queryStringObject = parsedUrl.query;
  const method = req.method.toLowerCase();
  const headersObject = req.headers;

  const requestProperties = {
    parsedUrl,
    path,
    trimmedPath,
    queryStringObject,
    method,
    headersObject,
  };

  const decoder = new StringDecoder("utf-8");
  let realData = "";
  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });
  req.on("end", () => {
    realData += decoder.end();
    requestProperties.body = parseJSON(realData)
    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFound;
    chosenHandler(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 500;
      payload = typeof payload === "object" ? payload : {};
      const payloadString = JSON.stringify(payload);
      res.setHeader('Content-Type','application/json')
      res.writeHead(statusCode);
      res.end(payloadString);
    });

    // res.end("Hello programers");
  });

  // res handling
};

module.exports = handler;
