//Backbone.Router implemented here

define(["backbone", "collections/userEventCollection", "views/createEventView", "helpers"],
    function (Backbone, UserEventCollection, CreateEventView, Helpers) {

        var Router = Backbone.Router.extend({
            initialize: function () {
                var self = this;
                var eventCollection = new UserEventCollection();
                eventCollection.fetch({
                    success: function (events) {
                        self.events = events;
                        Helpers._populateEventNames(self.events);
            }
                });
                Backbone.Events.on("router:navigate", function (url) {
                    self.navigate(url, {trigger: true});
                });

            },
            routes: {
                "": "index",
                "create": "addNewEvent",
                "about": "about"
            },
            _renderView: function (view) {
                //detaches element, resetting events
                var renderedView = view.render();
                //renderedView.$el.detach();
                //$("#app").empty().append(renderedView.el);
            },
            index: function () {
            }
        });
        return Router;
    });
