//Backbone.Router implemented here

define(["backbone", "collections/venueCollection", "helpers", "models/event"],
    function (Backbone, VenueCollection, Helpers, Event) {

        var Router = Backbone.Router.extend({
            routes: {
                "": "index",
                "events": "detailedView"
            },

            initialize: function () {
                var self = this;
                var venueCollection = new VenueCollection();
                venueCollection.fetch({
                    success: function (venues) {
                        self.events = venues;
                        Helpers._populateEventNames(self.events);
                    }
                });

                $("#challenge").click(function (e) {
                    e.preventDefault();
                    if (!($("#time").val() == "default")) self._handleEventCreation();
                });

                Backbone.Events.on("router:navigate", function (url) {
                    self.navigate(url, {trigger: true});
                });

            },

            _handleEventCreation: function () {
                var event = new Event({
                    name: $("#event").val(),
                    dates: $("#date").val() + "; " + $("#time").val(),
                    discount: $("#discount").val(),
                    number: 12
                });
                console.log(event.toJSON());
                event.save();
                Backbone.Events.trigger("router:navigate", "/events");

            },

            _renderView: function (view) {
                //detaches element, resetting events
                var renderedView = view.render();
                //renderedView.$el.detach();
                //$("#app").empty().append(renderedView.el);
            },
            index: function () {
            },

            detailedView: function () {
                console.log("ping from list view");
            }
        });
        return Router;
    });
