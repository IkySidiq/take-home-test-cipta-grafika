import autoBind from "auto-bind";

export class HealthHandler {
  constructor() {
    autoBind(this);
  }

  getHealthHandler(request, h) {
    return h.response({
      status: "ok",
      uptime: process.uptime(),
      version: "1.0.0",
    });
  }
}
