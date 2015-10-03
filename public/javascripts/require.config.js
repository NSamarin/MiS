//RequireJS config file

require.config({
    baseUrl: '/javascripts',
    paths: {
        jquery: 'libs/jquery-2.1.4',
        backbone: 'libs/backbone',
        underscore: 'libs/underscore'
    },
    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        }
    }
});

require(["init"]);