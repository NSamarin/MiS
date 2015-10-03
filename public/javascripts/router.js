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
                "about":"about"
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
                        self._addEventDetails(events);
                    }
                });
            },

            _addEventDetails: function (events) {

                $.each(events.toJSON(), function (i, item) {
                    $("#event").append($('<option>', {
                        value: item.name,
                        text: item.name
                    }));
                });
                this._addEventDate(events);

                var self = this;
                $( "#event" ).change(function() {
                    self._addEventDate(events);
                });
            },
            _addEventDate: function (events) {
                $("#date").html("");
                var eventName = $("#event").val();
                var event = events.findWhere({name: eventName});
                var dates = event.toJSON().dates;
                for (var day in dates) {
                    $("#date").append($('<option>', {
                        value: day,
                        text: day
                    }));
                }
                this._addEventTimes(event);
                var self = this;
                $( "#date" ).change(function() {
                    self._addEventTimes(event);
                });
            },

            _addEventTimes: function(event){
                var eventDay = $("#date").val();
                console.log(eventDay);
            }

        });
        return Router;
    });
