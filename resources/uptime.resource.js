"use strict";

const Resource = require("./resource");
const { ROUTES, START_TIME } = require("../models/globalVariables");

class UptimeResource extends Resource {
  constructor() {
    super();
  }

  select(req, res, next) {
    try{
      let total_time_delayed;;
      const currentTime = Date.now();
  
      if (ROUTES[req.params.id].status === 'delayed'){
        total_time_delayed = currentTime - ROUTES[req.params.id].time_updated + ROUTES[req.params.id].total_time_delayed;
      }else{
        total_time_delayed = ROUTES[req.params.id].total_time_delayed;
      }
      
      const total_time = currentTime - START_TIME;
      const percentUP = (1 - total_time_delayed / total_time) * 100;
      
      res.send({uptime:`${percentUP.toString()}%`});
      res.end();

    }catch(e){
      res.status(404);
      res.end();
    }
  }
}

module.exports = UptimeResource;
