define(["backbone", "handlebars"],
    function (Backbone, Handlebars) {
        var UserEventView = Backbone.View.extend({
            //el: $("#usertable"), // the element tag of this view
            //className: "dashboard",

            // some init here, for example detect view changes
            initialize: function () {
            },

            // render function here, returns the view itself
            render: function(){
                var template = $("#event_template").html();
                var compiled = Handlebars.compile(template);
                var html = compiled(this.model.attributes);
                this.$el.html(html);
                return this;
            }
        });
        return UserEventView;
    });
