const bodyParser = require("body-parser");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const authentication = require("./service/authentication.js");

function startApp({ session, logger, User }) {
  const app = express();

  app.use(
    morgan("combined", {
      stream: logger.stream
    })
  );
  app.use(helmet());
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  app.use(session);

  authentication.register({ app, User, logger });

  app.get("/home", (req, res) => {
    res.redirect("/");
  });

  app.use("/client.css", express.static(path.normalize(`${__dirname}/../../dist/client.css`)));
  app.use("/client.js", express.static(path.normalize(`${__dirname}/../../dist/client.js`)));
  app.use("/", express.static(path.normalize(`${__dirname}/../../src/asset/`)));

  return app;
}

module.exports = startApp;
