(function() {

    var app = angular.module('campaignAnalyticsApp', ['ngRoute']);

    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'createCampaignController',
                templateUrl: 'app/views/createCampaign.html'
            })
            .otherwise( { redirectTo: '/' } );
    });

}());