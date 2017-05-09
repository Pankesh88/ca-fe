(function() {

    var viewCampaignController = function ($scope, $http) {

        function init() {
            // $scope.showContent = function($fileContent){
            //     $scope.headers = processHeaders($fileContent);
            // };
        }
        init();

        $scope.campaignList=[];
		$scope.search_reset=false;
		$scope.submitData = function(){
			$scope.search_reset = true;
		};
		
        $scope.campaignList = [{
            serialNumber: "1",
            campaignName: "Health",
            Description : "It is a Health Insurance",
            operation   : " "
        },
		{
			serialNumber: "2",
			campaignName: "Dental",
			Description: "It is a Dental campaign",
			operation: " "
		},
		{
			serialNumber: "3",
			campaignName: "Car",
			Description: "It is Car campaign",
			operation: " "
		},
		{
			serialNumber: "4",
			campaignName: "car",
		    Description	: "It is car campaign",
			operation: " "
		}];

    };

    viewCampaignController.$inject = ['$scope','$http'];

    angular.module('campaignAnalyticsApp')
        .controller('viewCampaignController', viewCampaignController);

}());                                                                  