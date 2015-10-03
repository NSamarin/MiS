//Backbone.Router implemented here

define(["backbone", "collections/userEventCollection"],
    function (Backbone, UserEventCollection) {

        var Router = Backbone.Router.extend({
            initialize: function () {
                console.log(UserEventCollection);
            }
        });
        return Router;
    });