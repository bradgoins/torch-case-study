const express = require("express");

class Resource {
  constructor() {
    this.router = express.Router();
    this.init();
  }

  init() {
    // this.router.get("/", this.get.bind(this));
    this.router.get("/:id", this.select.bind(this));
  }


  async get(req, res, next) {
    res.send();
  }

  select(req, res, next) {
    res.send();
  }

}

module.exports = Resource;
