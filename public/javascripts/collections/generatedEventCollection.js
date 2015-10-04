define(["backbone", "models/generatedEvent"],
    function (Backbone, GeneratedEvent) {
        var GeneratedEventCollection = Backbone.Collection.extend({
            model: GeneratedEvent,
            url: '/api/events'
        });
        return GeneratedEventCollection;
    });