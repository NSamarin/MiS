define(["backbone"],
    function (Backbone) {
        var createEventView = Backbone.View.extend({
            //el: $("#usertable"), // the element tag of this view
            //className: "dashboard",

            // some init here, for example detect view changes
            initialize: function () {
            },

            // render function here, usually returns the view itself
            render: function(){
                var self = this;
                this.$el.append('<select>');
                $.each(this.collection.toJSON(), function (i, item) {
                    self.$el.append($('<option>', {
                        value: item.name,
                        text : item.name
                    }));
                });
                this.$el.append('</select>');
                console.log(this.$el.html());
            }

            /*
            TODO: try using collection's toJSON method to get all the "events" objects,
            then try attaching those events to the dropdown box using jquery function
            after that you can use underscore's filter or find function to get properties
            of just the events that are selected by the user
            */









        });
        return createEventView;
    });
