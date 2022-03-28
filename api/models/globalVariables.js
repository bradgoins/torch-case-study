let START_TIME = Date.now();
const ROUTES = {
  A: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },
  C: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },
  E: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },

  G: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },

  N: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },
  Q: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },
  R: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },
  S: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },

  1: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },
  2: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },
  3: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },
  4: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },
  5: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },
  6: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },
  7: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },

  B: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },
  D: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },
  F: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },
  M: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },

  J: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },
  Z: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },

  L: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },

  SIR: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },
  SI: { status: "not delayed", total_time_delayed: 0, time_updated: Date.now() },
};

module.exports = {START_TIME, ROUTES};