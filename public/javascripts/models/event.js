define(["backbone"], function (Backbone) {
    var Event = Backbone.Model.extend({
        urlRoot: '/api/events'
    });
    return Event;
});