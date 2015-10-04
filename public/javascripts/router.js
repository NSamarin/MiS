//Backbone.Router implemented here

define(["backbone", "collections/userEventCollection", "helpers", "models/generatedEvent"],
    function (Backbone, UserEventCollection, Helpers, GeneratedEvent) {

        var Router = Backbone.Router.extend({
            routes: {
                "": "index",
                "events": "listView"
            },

            initialize: function () {
                var self = this;
                var eventCollection = new UserEventCollection();
                eventCollection.fetch({
                    success: function (events) {
                        self.events = events;
                        Helpers._populateEventNames(self.events);
            }
                });

                $("#challenge").click(function(e){
                    console.log("A click!");
                    e.preventDefault();
                    Backbone.Events.trigger("router:navigate", "/events");
                });

                Backbone.Events.on("router:navigate", function (url) {
                    self.navigate(url, {trigger: true});
                });

            },

            _renderView: function (view) {
                //detaches element, resetting events
                var renderedView = view.render();
                //renderedView.$el.detach();
                //$("#app").empty().append(renderedView.el);
            },
            index: function () {
            },
            listView: function(){
                console.log("ping");
                //TODO: check for defaults and redirect
                var generatedEvent = new GeneratedEvent({
                    name: $("#event").val(),
                    dates: $("#date").val() + "; " + $("#time").val(),
                    discount: $("#discount").val(),
                    number: 12
                });
                console.log(generatedEvent.toJSON());
                generatedEvent.save(); //TODO: specify API url
            }
        });
        return Router;
    });
