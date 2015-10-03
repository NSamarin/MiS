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
                "create": "addNewEvent",
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
                $.each(dates, function (i, item) {
                    $("#date").append($('<option>', {
                        value: i,
                        text: i
                    }));
                });
                this._addEventTime(dates);

                var self = this;
                $( "#date" ).change(function() {
                    eventName = $("#event").val();
                    event = events.findWhere({name: eventName});
                    dates = event.toJSON().dates;
                    self._addEventTime(dates);
                });
            },
            _addEventTime: function(dates){
                console.log("called from add event time");
                $("#time").html("");
                var eventDate = $("#date").val();
                for (var i = 0; i < dates[eventDate].length; i++){
                    $("#time").append($('<option>', {
                        value: dates[eventDate][i],
                        text: dates[eventDate][i]
                    }));
                }

            }


        });
        return Router;
    });
