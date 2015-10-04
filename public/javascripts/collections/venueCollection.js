define(["backbone", "models/venue"],
    function (Backbone, Venue) {
        var VenueCollection = Backbone.Collection.extend({
            model: Venue,
            url: '/api/venues'
        });
        return VenueCollection;
    });