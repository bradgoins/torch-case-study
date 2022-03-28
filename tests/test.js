const app = require("../app.js");
const supertest = require("supertest");
const request = supertest(app);

let { ROUTES, START_TIME } = require("../models/globalVariables");

describe("status endpoint", () => {
  it("GET /status/:id should show status", async () => {
    let res = await request.get("/status/A");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ status: "not delayed" });

    ROUTES["A"].status = "delayed";
    res = await request.get("/status/A");
    expect(res.body).toEqual({ status: "delayed" });

    ROUTES["A"].status = "not delayed";
  });

  it("GET /status/:id return 404 if not found", async () => {
    let res = await request.get("/status/TEST");
    expect(res.status).toEqual(404);
  });
});

describe("uptime endpoint", () => {
  it("GET /uptime/:id should show uptime", async () => {    
    let res = await request.get("/uptime/A");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ uptime: "100%" });
  });

  it("GET /status/:id return 404 if not found", async () => {
    let res = await request.get("/uptime/TEST");
    expect(res.status).toEqual(404);
  });
});
