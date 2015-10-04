//Backbone.Router implemented here

define(["backbone", "collections/venueCollection", "collections/eventCollection", "helpers", "models/event", "handlebars"],
    function (Backbone, VenueCollection, EventCollection, Helpers, Event, Handlebars) {

        var Router = Backbone.Router.extend({
            routes: {
                "": "index",
                "events/:id": "detailedView",
                "events": "listView"
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

                var singleEvent = Backbone.Model.extend({urlRoot : '/api/events'});

                var event = new singleEvent({
                    name: $("#event").val(),
                    dates: $("#date").val() + "; " + $("#time").val(),
                    discount: $("#discount").val(),
                    number: $("#minppl").val()
                });

                console.log(event.toJSON());
                event.save();

                var eventCollection = new EventCollection;

                eventCollection.fetch({
                    success: function (data) {
                        Backbone.Events.trigger("router:navigate", "/events/" + data.last().get("id"));
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
                var self = this;
                var eventCollection = new EventCollection();
                eventCollection.fetch({
                    success: function(data){
                        console.log(data);
                        var event = data.find(function(ev){
                            return ev.get("id") == id;
                        });
                        if (event) self._populateDetailedView(event);
                        else {
                            Backbone.Events.trigger("router:navigate", "/events");
                            location.reload();
                        }

                    }
                });
                //var event = new Event();
                //event.fetch({
                //    success: function(data){
                //        $("#peopleLeft").html(event.get("number"));
                //    }
                //});

                //
            },

            _populateDetailedView: function(event) {
                console.log(event.get("number"));
                $("#eventName").html(event.get("name"));
                $("#peopleLeft").html(event.get("number"));

            },
            listView: function(){
                console.log("ping from REAL list");
                var eventCollection = new EventCollection();
                eventCollection.fetch({
                    success: function(events) {
                        events.each(function(item){
                            var template = $("#booktemplate").html();
                            var compiled = Handlebars.compile(template);
                            var html = compiled(item.attributes);
                            console.log(html);
                            $("#itemList").html(html);
                        });

                    }
                });
            }
        });
        return Router;
    });
