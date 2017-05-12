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
            Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. col-sm-8anged. e recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            operation   : " ",
			isTemplate: true
        },
		{
			serialNumber: "2",
			campaignName: "Dental",
			Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. col-sm-8anged. e recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
			operation: " ",
            isTemplate: true
		},
		{
			serialNumber: "3",
			campaignName: "Car",
			Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. col-sm-8anged. e recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
			operation: " ",
            isTemplate: true
		},
		{
			serialNumber: "4",
			campaignName: "car",
		    Description	: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. col-sm-8anged. e recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
			operation: " ",
            isTemplate: false
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