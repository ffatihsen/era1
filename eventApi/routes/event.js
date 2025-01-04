const express = require("express");
const router = express.Router();
const { getAllEvent, createEvent, updateEvent, deleteEvent, addParticipant, addComment } = require("../controllers/event");


const {authChech} = require("../middleware/checkAuth")


router.get("/", getAllEvent);
router.post("/",authChech, createEvent);
router.put("/:id", authChech, updateEvent);
router.delete("/:id",authChech, deleteEvent);
router.post("/:eventId/participants",authChech, addParticipant);
router.post("/:eventId/comments", authChech, addComment);




module.exports = router;
