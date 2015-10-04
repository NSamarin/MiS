define(["backbone", "models/userEvent"],
    function (Backbone, UserEvent) {
        var UserEventCollection = Backbone.Collection.extend({
            model: UserEvent,
            url: '/api/venues'
        });
        return UserEventCollection;
    });