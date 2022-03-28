const app = require("./app");

const monitorMTA = require("./services/monitorMTA");
port = process.env.PORT || process.env.NODE_PORT || 3001;

// listening
app.listen(port, () => {
  console.log(`👂 Server is listening on port ${port}`);
});

monitorMTA();
