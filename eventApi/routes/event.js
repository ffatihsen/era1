const express = require("express");
const router = express.Router();
const { getAllEvent, createEvent, updateEvent, deleteEvent, addParticipant, addComment } = require("../controllers/event");


const {authChech} = require("../middleware/checkAuth")

const validationHandler = require("../utils/validators")
const eventValidator = require("../utils/validators/eventValidator")

router.get("/", getAllEvent);
router.post("/",authChech,validationHandler(eventValidator.createEvent), createEvent);
router.put("/:id", authChech, validationHandler(eventValidator.updateEvent), updateEvent);
router.delete("/:id",authChech, deleteEvent);
router.post("/:eventId/participants",authChech, validationHandler(eventValidator.addParticipant), addParticipant);
router.post("/:eventId/comments", authChech, validationHandler(eventValidator.addComment), addComment);




module.exports = router;
