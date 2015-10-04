//Backbone.Router implemented here

define(["backbone", "collections/venueCollection", "helpers", "models/event"],
    function (Backbone, VenueCollection, Helpers, Event) {

        var Router = Backbone.Router.extend({
            routes: {
                "": "index",
                "events/:id": "detailedView"
            },

            initialize: function () {
                var self = this;
                var venueCollection = new VenueCollection();
                venueCollection.fetch({
                    success: function (venues) {
                        Helpers._populateEventNames(venues);
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
                //NB! "EVENT" might break, because might be taken class
                //In this case CHANGE
                var self = this;

                var event = new Event({
                    name: $("#event").val(),
                    dates: $("#date").val() + "; " + $("#time").val(),
                    discount: $("#discount").val(),
                    number: $("#minppl").val()
                });
                console.log(event.toJSON());
                event.save();

                event.fetch({
                    success: function (data) {
                        Backbone.Events.trigger("router:navigate", "/events/" + data.get("id"));
                        location.reload();
                    }
                });
            },

            _renderView: function (view) {
                //detaches element, resetting events
                var renderedView = view.render();
                //renderedView.$el.detach();
                //$("#app").empty().append(renderedView.el);
            },
            index: function () {
                console.log("ping from index page");
            },

            detailedView: function (id) {
                console.log("ping from list view");
                console.log(id);
                //TODO: create collection instead and get the model with required ID!!
                var event = new Event();
                event.fetch({
                    success: function(data){
                        $("#peopleLeft").html(event.get("number"));
                    }
                });

                //




            }
        });
        return Router;
    });
