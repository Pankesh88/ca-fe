(function() {

    var scheduleStatusController = function ($scope, $http) {

        function init() {
            // $scope.showContent = function($fileContent){
            //     $scope.headers = processHeaders($fileContent);
            // };
        }
        init();

        $scope.campaignList=[];

        $scope.campaignList = [{
            campaignName: "campaignName 1",
            campaignDescription: "campaignDescription 1",
            campaignType: "SMS",
            scheduleDateTime: "10/05/2017",
            runStatus:"Scheduled"
        },
        {
            campaignName: "campaignName 2",
            campaignDescription: "campaignDescription 2",
            campaignType: "EMAIL",
            scheduleDateTime: "08/05/2017",
            runStatus:"Completed"
        },
        {
            campaignName: "campaignName 3",
            campaignDescription: "campaignDescription 3",
            campaignType: "EMAIL & SMS",
            scheduleDateTime: "10/05/2017",
            runStatus:"Scheduled"
        },
        {
            campaignName: "campaignName 4",
            campaignDescription: "campaignDescription 4",
            campaignType: "EMAIL",
            scheduleDateTime: "10/05/2017",
            runStatus:"Pending"
        }];

    };

    scheduleStatusController.$inject = ['$scope','$http'];

    angular.module('campaignAnalyticsApp')
        .controller('scheduleStatusController', scheduleStatusController);

}());