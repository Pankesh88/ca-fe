(function() {

    var createCampaignController = function ($scope) {

        function init() {
            $scope.showContent = function($fileContent){
                $scope.headers = $fileContent;
                $scope.headerCopy = $fileContent;
            };

        }
        init();
        $scope.addRule = function(index, header){
            $scope.headers.splice(index, 0, header);
        };
        $scope.removeRule = function(index){
            $scope.headers.splice(index, 1);
        };
        $scope.resetHeaders = function(){
            $scope.headers.splice(index, 1);
        };
    };

    createCampaignController.$inject = ['$scope'];

    angular.module('campaignAnalyticsApp')
        .controller('createCampaignController', createCampaignController);

}());