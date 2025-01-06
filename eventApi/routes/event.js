const express = require("express");
const router = express.Router();
const { getAllEvent, createEvent, updateEvent, deleteEvent, addParticipant, addComment, getEventById,removeParticipant,getJoinedEvent,getCreatedEvent } = require("../controllers/event");


const {authChech} = require("../middleware/checkAuth")

const validationHandler = require("../utils/validators")
const eventValidator = require("../utils/validators/eventValidator")

const multer = require('multer');


const upload = multer({
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            return cb(new Error('Only .jpg and .png files are allowed.'));
        }
        cb(null, true);
    },
}).single('photo')


router.get("/", getAllEvent);
router.get("/joined",authChech, getJoinedEvent);
router.get("/created",authChech, getCreatedEvent);
router.get("/:eventId",authChech, getEventById);
router.post("/", authChech,upload,  createEvent);
router.put("/:id", authChech, validationHandler(eventValidator.updateEvent), updateEvent);
router.delete("/:id",authChech, deleteEvent);
router.post("/:eventId/participants",authChech, validationHandler(eventValidator.addParticipant), addParticipant);
router.post("/:eventId/participants/remove",authChech, validationHandler(eventValidator.addParticipant), removeParticipant);
router.post("/:eventId/comments", authChech, validationHandler(eventValidator.addComment), addComment);




module.exports = router;
