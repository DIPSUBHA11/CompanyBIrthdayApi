import express from "express";
import eventController from './controller/eventController.js'
let router = express.Router();

let eventcontroller = new eventController();

router.get(
    "/gettingEvent",
    eventcontroller.getEventData
  );
export default router;