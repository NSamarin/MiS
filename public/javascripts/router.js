//Backbone.Router implemented here

define(["backbone", "collections/userEventCollection", "views/createEventView"],
    function (Backbone, UserEventCollection, CreateEventView) {

        var Router = Backbone.Router.extend({
            initialize: function () {
                var self = this;
                this.$event = $("#event");
                this.$date = $("#date");
                this.$time = $("#time");
                this.$discount = $("#discount");

                var eventCollection = new UserEventCollection();
                eventCollection.fetch({
                    success: function (events) {
                        self.events = events;
                        self._populateEventNames(self.events);
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
            },

            _populateEventNames: function () {
                var self = this;


                $.each(this.events.toJSON(), function (index, item) {
                    self.$event.append($('<option>', {
                        value: item.name,
                        text: item.name
                    }));
                });

                this.$event.change(function () {
                        self._populateEventDates();
                    }
                )
            },

            _populateEventDates: function () {
                var self = this;
                this.$date.unbind();

                this.$date.html('<option selected value="default">Select Date</option>');
                this.$time.html('<option selected value="default">Select Time</option>');
                var eventName = this.$event.val();

                this.event = this.events.find(function (item) {
                    return item.get("name") == eventName;
                });

                if (!this.event) return;

                for (var property in this.event.toJSON().dates) {
                    self.$date.append($('<option>', {
                        value: property,
                        text: property
                    }));
                }

                this.$discount.html($('<option>', {
                    value: self.event.toJSON().discount,
                    text: self.event.toJSON().discount
                }));


                this.$date.change(function () {
                        self._populateEventTimes();
                    }
                )
            },
            _populateEventTimes: function () {
                var self = this;
                this.$time.html('<option selected value="default">Select Time</option>');
                var eventDate = this.$date.val();
                if (!this.event.toJSON().dates[eventDate]) return;
                console.log("from event times");

                $.each(this.event.toJSON().dates[eventDate], function (index, item) {
                    self.$time.append($('<option>', {
                        value: item,
                        text: item
                    }));
                });
            }


            //addNewEvent: function () {
            //    var eventCollection = new UserEventCollection();
            //    var self = this;
            //    eventCollection.fetch({
            //        success: function (events) {
            //            self._addEventDetails(events);
            //        }
            //    });
            //},
            //
            //_addEventDetails: function (events) {
            //
            //    $.each(events.toJSON(), function (i, item) {
            //        $("#event").append($('<option>', {
            //            value: item.name,
            //            text: item.name
            //        }));
            //    });
            //    this._addEventDate(events);
            //
            //    var self = this;
            //    $( "#event" ).change(function() {
            //        self._addEventDate(events);
            //    });
            //},
            //_addEventDate: function (events) {
            //    $("#date").html("");
            //    var eventName = $("#event").val();
            //    var event = events.findWhere({name: eventName});
            //    var dates = event.toJSON().dates;
            //    $.each(dates, function (i, item) {
            //        $("#date").append($('<option>', {
            //            value: i,
            //            text: i
            //        }));
            //    });
            //    this._addEventTime(dates);
            //
            //    var self = this;
            //    $( "#date" ).change(function() {
            //        eventName = $("#event").val();
            //        event = events.findWhere({name: eventName});
            //        dates = event.toJSON().dates;
            //        self._addEventTime(dates);
            //    });
            //},
            //_addEventTime: function(dates){
            //    console.log("called from add event time");
            //    $("#time").html("");
            //    var eventDate = $("#date").val();
            //    for (var i = 0; i < dates[eventDate].length; i++){
            //        $("#time").append($('<option>', {
            //            value: dates[eventDate][i],
            //            text: dates[eventDate][i]
            //        }));
            //    }
            //
            //}


        });
        return Router;
    });
