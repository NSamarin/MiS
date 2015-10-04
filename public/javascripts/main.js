//Start router

define(["backbone", "router"], function (Backbone, Router) {
    var App = {};
    App.start = function () {
        new Router();
        Backbone.history.start({pushState: true}); //might need to change or prevent defaults
    };
    return App;
});
