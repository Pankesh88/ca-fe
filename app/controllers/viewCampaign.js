(function() { 

    var viewCampaignController = function ($scope, $http) {
		
		 $http.get("/getCampaign").then(function(data){
			$scope.campaignList = data.campaignList;
		 
											
	});
	}
		}());
