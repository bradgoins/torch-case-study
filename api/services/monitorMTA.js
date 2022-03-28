const axios = require("axios");
const setStatus = require("./setStatus");

async function monitorMTA() {
  const requestSettings = {
    headers: {
      "x-api-key": process.env.API_KEY,
    },
  };

  const response = await axios.get("https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts.json", requestSettings);

  if (response.status == 200) {
    const results = response.data;

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
}

module.exports = monitorMTA;
