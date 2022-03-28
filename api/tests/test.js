const app = require("../app.js");
const supertest = require("supertest");
const appApi = supertest(app);
const monitorMTA = require("../services/monitorMTA.js");
const axios = require("axios");
jest.mock("axios");

let { ROUTES, START_TIME } = require("../models/globalVariables");

describe("status endpoint", () => {
  it("GET /status/:id should show status", async () => {
    let res = await appApi.get("/status/A");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ status: "not delayed" });

    ROUTES["A"].status = "delayed";
    res = await appApi.get("/status/A");
    expect(res.body).toEqual({ status: "delayed" });

    ROUTES["A"].status = "not delayed";
  });

  it("GET /status/:id return 404 if not found", async () => {
    let res = await appApi.get("/status/TEST");
    expect(res.status).toEqual(404);
  });
});

describe("uptime endpoint", () => {
  it("GET /uptime/:id should show uptime", async () => {    
    let res = await appApi.get("/uptime/A");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ uptime: "100%" });
  });

  it("GET /status/:id return 404 if not found", async () => {
    let res = await appApi.get("/uptime/TEST");
    expect(res.status).toEqual(404);
  });
});

describe("monitorMTA", () => {
  beforeEach(() => {  
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
  });

  it("should call request with settings", async () => {
    process.env.API_KEY = "test key";
    
    axios.get.mockResolvedValueOnce({status: 200, data: { entity: [] }});
    await monitorMTA();

    expect(axios.get).toHaveBeenCalledWith(
      "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts.json",
      { headers: { "x-api-key": "test key" } }
    );
  });

  it("delayed status gets set", async () => {
    const consoleLogMock = jest
      .spyOn(console, "log")
      .mockImplementationOnce(() => {});

    axios.get.mockResolvedValueOnce({
      status: 200,
      data: {
        entity: [
          {
            alert: {
              "transit_realtime.mercury_alert": {
                alert_type: "Delays",
              },
              informed_entity: [
                { route_id: "A" },
                { route_id: "B" }
              ]
            },
          },
        ],
      },
    });

    await monitorMTA();
    expect(ROUTES["A"].status).toEqual("delayed");
    expect(ROUTES["B"].status).toEqual("delayed");

    expect(consoleLogMock).toBeCalledTimes(2);
    expect(consoleLogMock.mock.calls).toEqual([
      [`Line A is experiencing delays`],
      [`Line B is experiencing delays`],
    ]);

  })

  it("not delayed status gets set", async () => {
    const consoleLogMock = jest
      .spyOn(console, "log")
      .mockImplementationOnce(() => {});

    ROUTES["A"].status = 'delayed';
    ROUTES["B"].status = "delayed";

    axios.get.mockResolvedValueOnce({
      status: 200,
      data: {
        entity: [
          {
            alert: {
              "transit_realtime.mercury_alert": {
                alert_type: "anything except Delays",
              },
              informed_entity: [{ route_id: "A" }, { route_id: "B" }],
            },
          },
        ],
      },
    });

    await monitorMTA();

    expect(ROUTES["A"].status).toEqual("not delayed");
    expect(ROUTES["B"].status).toEqual("not delayed");

    expect(consoleLogMock).toBeCalledTimes(2);
    expect(consoleLogMock.mock.calls).toEqual([
      [`Line A is now recovered`],
      [`Line B is now recovered`],
    ]);
  })

  it("sets delayed time", async () => {
    const currentTime = Date.now();
    const DateMock = jest
      .spyOn(Date, "now")
      .mockImplementationOnce(() => currentTime);

    axios.get.mockResolvedValueOnce({
      status: 200,
      data: {
        entity: [
          {
            alert: {
              "transit_realtime.mercury_alert": {
                alert_type: "Delays",
              },
              informed_entity: [{ route_id: "A" }],
            },
          },
        ],
      },
    });

    await monitorMTA();

    expect(ROUTES["A"].time_updated).toEqual(currentTime);
  })

});
