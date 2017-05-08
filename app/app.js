(function() {

    var app = angular.module('campaignAnalyticsApp', ['ngRoute']);

    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'createCampaignController',
                templateUrl: 'app/views/createCampaign.html'
            })
            .when('/viewcampaign', {
                controller: 'viewCampaignController',
                templateUrl: 'app/views/viewCampaign.html'
            })
			.when('/schedule', {
                controller: 'scheduleStatusController',
                templateUrl: 'app/views/scheduleStatus.html'
            })
            .otherwise( { redirectTo: '/' } );
    });

    app.config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());