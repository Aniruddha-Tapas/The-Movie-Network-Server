module.exports = function (app) {

    app.post('/api/event', createEvent);
    app.put('/api/event', updateEvent);
    app.get('/api/events', findAllEventOfUser);
    app.get('/api/events/nearby', findAllEventsNearUser);
    app.delete('/api/event/:eventId', deleteEvent);

    let eventModel = require('../models/event/event.model.server');
    let userModel = require('../models/user/user.model.server');

    function createEvent(req, res) {
        let event = req.body;
        let user = req.session.currentUser;
        eventModel.createEvent(event)
            .then(response => {
                userModel.updateUserEvent(user._id, response)
                    .then(response1 => res.sendStatus(200))
            });
    }

    function updateEvent(req,res){
        let event = req.body;
        eventModel.updateEvent(event)
            .then(() => res.sendStatus(200));
    }

    function findAllEventOfUser(req, res) {
        let user = req.session.currentUser;
        userModel.findAllEventsOfUser(user)
            .then(response => res.json(response));
    }

    function deleteEvent(req, res) {
        let eventId = req.params['eventId'];
        let user = req.session.currentUser;

        eventModel.deleteEvent({_id: eventId})
            .then(() => {
                userModel.deleteUserEvent({_id: user._id}, {_id: eventId})
                    .then(() => res.sendStatus(200))
            })
    }

    function findAllEventsNearUser(req, res) {
        let userId = req.session['userId'];
        if (userId !== undefined) {
            userModel.findUserById(userId)
                .then(result => {
                    if (result.city === '') {
                        res.sendStatus(501);
                    }
                })
        }
        else {
            res.sendStatus(500);
        }
    }
};
