const request = require("request");
const setStatus = require("./setStatus");

function monitorMTA() {
  const requestSettings = {
    method: "GET",
    url: "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts.json",
    headers: {
      "x-api-key": process.env.API_KEY,
    },
  };

  request(requestSettings, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const results = JSON.parse(body);

      const delays = {};
      results.entity.forEach((entity) => {
        if (
          entity.alert["transit_realtime.mercury_alert"].alert_type === "Delays"
        ) {
          entity.alert.informed_entity.forEach((e) => {
            if (e.route_id) {
              delays[e.route_id] = true;
            }
          });
        }
      });

      setStatus(delays);
    }

    setTimeout(monitorMTA, 60000); // check again after 1 min
  });
}

module.exports = monitorMTA;
