"use strict";

const Resource = require("./resource");
const { ROUTES } = require("../models/globalVariables");

class StatusResource extends Resource {
  constructor() {
    super();
  }

  select(req, res, next) {
    try{
      res.send({status: ROUTES[req.params.id].status});
      res.end();
    }catch(e){
      res.status(404);
      res.end();
    }
  }
}

module.exports = StatusResource;
