(function() {

    var app = angular.module('campaignAnalyticsApp', ['ngRoute']);

    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'createCampaignController',
                templateUrl: 'app/views/createCampaign.html'
            })
			 .when('/viewCampaign', {
                controller: 'viewCampaignController',
                templateUrl: 'app/views/viewCampaign.html'
            })
			.when('/scheduleStatus', {
                controller: 'scheduleStatusController',
                templateUrl: 'app/views/scheduleStatus.html'
            })
            .otherwise( { redirectTo: '/' } );
    });

}());