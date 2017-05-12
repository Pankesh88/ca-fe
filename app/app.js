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
			.when('/scheduled', {
                controller: 'scheduleStatusController',
                templateUrl: 'app/views/scheduleStatus.html'
            })
			.when('/campaignReport', {
                controller: 'campaignReportController',
                templateUrl: 'app/views/campaignReport.html'
			})
            .otherwise( { redirectTo: '/' } );
    });

    app.config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
}());