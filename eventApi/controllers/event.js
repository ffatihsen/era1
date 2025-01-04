const Event = require('../models/event'); 


const getAllEvent = async (req, res) => {
    try {
        const events = await Event.find();
        if (!events || events.length === 0) {
            return res.status(404).json({ message: 'Hiç etkinlik bulunamadı.' });
        }
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};



const createEvent = async (req, res) => {
    try {
        const { title, description, date, location, organizer } = req.body;

        const {userId, userName}= req.user

 
        const newEvent = new Event({
            title,
            description,
            date,
            location,
            organizer,
            userId,
            userName
        });

   
        await newEvent.save();

        res.status(201).json({ message: 'Etkinlik başarıyla oluşturuldu.', event: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};




const addParticipant = async (req, res) => {
    const { eventId } = req.params;
    const { userId, userName } = req.user;


    try {
        const event = await Event.findById(eventId);


        if (!event) {
            return res.status(404).json({ message: 'Etkinlik bulunamadı.' });
        }

        if (event.participants.some(participant => participant?.userId === userId)) {
            return res.status(400).json({ message: 'Kullanıcı zaten etkinliğe katıldı.' });
        }

        event.participants.push({ userId, userName });
        await event.save();

        res.status(200).json({ message: 'Kullanıcı etkinliğe başarıyla katıldı.', event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};



const addComment = async (req, res) => {
    const { eventId } = req.params;
    const { comment } = req.body; 
    const { userId, userName } = req.user;


    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Etkinlik bulunamadı.' });
        }

        event.comments.push({
            userId,
            userName,
            comment,
            date: new Date(),
        });

        await event.save();

        res.status(200).json({ message: 'Yorum başarıyla eklendi.', event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};



const updateEvent = async (req, res) => {
    const { id } = req.params; 
    const { userId } = req.user;

    try {
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({ message: 'Etkinlik bulunamadı.' });
        }

       
        if (event.userId !== userId) {
            return res.status(403).json({ message: 'Bu etkinliği güncelleme yetkiniz yok.' });
        }

        
        const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({ message: 'Etkinlik başarıyla güncellendi.', event: updatedEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};


const deleteEvent = async (req, res) => {
    const { id } = req.params; 
    const { userId } = req.user;

    try {
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({ message: 'Etkinlik bulunamadı.' });
        }

      
        if (event.userId !== userId) {
            return res.status(403).json({ message: 'Bu etkinliği silme yetkiniz yok.' });
        }

        
        await event.remove();

        res.status(200).json({ message: 'Etkinlik başarıyla silindi.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};

module.exports = {
    getAllEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    addParticipant,
    addComment,
};
