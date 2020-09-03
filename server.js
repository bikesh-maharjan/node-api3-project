const express = require("express"); // importing a common JS MOdule
const userRouter = require("./users/userRouter");

const server = express();

// JSON Server //
// this is global middlware ///
server.use(express.json()); // build in middlware
// set up for server to use the router
server.use(logger);
server.use("/api/users", userRouter);

//custom middleware

function logger(req, res, next) {
  console.log(
    `a ${req.method} request was made to ${req.url} at ${new Date()}`
  );
  next();
}

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
