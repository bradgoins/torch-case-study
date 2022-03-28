const { ROUTES, START_TIME } = require("../models/globalVariables");

function setStatus(delays) {
  const keys = Object.keys(ROUTES);

  keys.forEach((key) => {
    if (delays[key] === true) {
      if (ROUTES[key].status === "not delayed") {
        console.log(`Line ${key} is experiencing delays`);
        ROUTES[key].time_updated = Date.now();
      }
      ROUTES[key].status = "delayed";
    } else {
      if (ROUTES[key].status === "delayed") {
        console.log(`Line ${key} is now recovered`);

        let total_time_delayed = 0;
        const currentTime = Date.now();

        if (!ROUTES[key].total_time_delayed) {
          total_time_delayed = currentTime - START_TIME;
        } else {
          total_time_delayed += currentTime - ROUTES[key].time_updated;
        }

        ROUTES[key].total_time_delayed = total_time_delayed;
        ROUTES[key].time_updated = currentTime;
      }

      ROUTES[key].status = "not delayed";
    }
  });
}

module.exports = setStatus;
