//Backbone.Router implemented here

define(["backbone", "collections/userEventCollection", "views/createEventView"],
    function (Backbone, UserEventCollection, CreateEventView) {

        var Router = Backbone.Router.extend({
            initialize: function () {
                var self = this;
                Backbone.Events.on("router:navigate", function (url) {
                    self.navigate(url, {trigger: true});
                });
            },
            routes: {
                "": "index",
                "create": "addNewEvent"
            },
            _renderView: function (view) {
                //detaches element, resetting events
                var renderedView = view.render();

                //renderedView.$el.detach();
                //$("#app").empty().append(renderedView.el);
            },
            index: function () {
            },
            addNewEvent: function () {
                var eventCollection = new UserEventCollection();
                var self = this;
                eventCollection.fetch({
                    success: function (events) {
                        var createEventView = new CreateEventView({
                            collection: events
                        });
                        self._renderView(createEventView);
                        console.log(eventCollection.toJSON())
                    }
                });
            }
        });
        return Router;
    });