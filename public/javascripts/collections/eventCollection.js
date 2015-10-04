define(["backbone", "models/event"],
    function (Backbone, Event) {
        var EventCollection = Backbone.Collection.extend({
            model: Event,
            url: '/api/events'
        });
        return EventCollection;
    });