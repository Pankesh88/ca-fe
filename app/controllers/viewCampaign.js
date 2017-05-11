(function() {

    var viewCampaignController = function ($scope, $http) {

        function init() {
            // $scope.showContent = function($fileContent){
            //     $scope.headers = processHeaders($fileContent);
            // };
        }
        init();

		$scope.findData='';
        $scope.campaignList=[];
		$scope.search_reset=false;
		$scope.submitData = function(){
			$scope.search_reset = !$scope.search_reset;
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
/*
function myFunction() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}*/



    viewCampaignController.$inject = ['$scope','$http'];

    angular.module('campaignAnalyticsApp')
        .controller('viewCampaignController', viewCampaignController);

}());                                                                  