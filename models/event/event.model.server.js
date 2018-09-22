let mongoose = require('mongoose');
let eventSchema = require('./event.schema.server');
let eventModel = mongoose.model('EventModel', eventSchema);

function createEvent(event) {
    return eventModel.create({
        name: event.eventName,
        date: event.eventDate,
        location: event.venueName,
        desc: event.eventDesc})
}

function deleteEvent(eventId) {
    return eventModel.remove(eventId);
}

function findEventByCity(city){
    return eventModel.find({location:city})
}

function updateEvent(event){
    return eventModel.updateOne({_id:event._id},event)
}

let api = {
    createEvent: createEvent,
    deleteEvent: deleteEvent,
    findEventByCity:findEventByCity,
    updateEvent:updateEvent
};

module.exports = api;