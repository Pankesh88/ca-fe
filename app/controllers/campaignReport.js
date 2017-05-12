(function() {

    var campaignReportController = function ($scope, $http) {

        function init() {
            $scope.showContent = function ($fileContent) {
                $scope.headers = processHeaders($fileContent);
            };
        }

        init();

        $scope.campaignList = [];

        $scope.data = {
            campaignName: "",
            campaignDescription: "",
            campaignType: "",
            campaignMessage: "",
            scheduleDateTime: new Date()
        };

    };
    campaignReportController.$inject = ['$scope','$http'];
    angular.module('campaignAnalyticsApp')
        .controller('campaignReportController', campaignReportController);

}());