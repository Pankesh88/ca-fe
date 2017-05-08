(function() { 

    var createCampaignController = function ($scope, $http) {

        function init() {
            $scope.showContent = function($fileContent){
                $scope.headers = processHeaders($fileContent);
            };
        }
        init();
	
		$scope.campaignList=[];
	
        $scope.data = {
            campaignName: "",
            campaignDescription: "",
            campaignType: "",
			campaignMessage: "",
            scheduleDateTime: new Date()
        };
		
		
        $scope.submitForm = function() {
            console.log("posting data....");
            console.log(JSON.stringify($scope.headers));
            $scope.data.rules = $scope.headers;
			$scope.data.scheduleDateTime = $scope.data.scheduleDateTime? new Date($scope.data.scheduleDateTime).getTime(): null;
			console.log($scope.data);
            var ruleObj =[];
			var payloadData = angular.copy($scope.data);
			payloadData.rules = $scope.headers;
			var fileInput = document.getElementById('dataSetFile');
			var payload = new FormData();
			payload.append("data", JSON.stringify(payloadData));
			payload.append('file', fileInput.files[0]);

    		$http({
				url: 'http://localhost:5000/api/v1/campaign',
				method: 'POST',
				data: payload,
				//assign content-type as undefined, the browser
				//will assign the correct boundary for us
				headers: { 'Content-Type': undefined},
				//prevents serializing payload.  don't do it.
				transformRequest: angular.identity
			})
			.then(function (data) {
				console.log('Alpha');
				console.log(data);
			});

				$http.get('http://localhost:5000/api/v1/getCampaign').then(function(data){
			console.log('Hey')
						console.log(data);
					console.log(JSON.stringify(data.data));
					$scope.campaignData = data.data;
			
		});
			
				$http.get('http://localhost:5000/api/v1/scheduleStatus').then(function(data){
						console.log(data);
					console.log(JSON.stringify(data.data));
					$scope.campaignData = data.data;
			
		});
	
	
        };

        $scope.addRule = function(index, header, operation){

            // Updating Header with operation
            header.operation = operation;

            var newHeader = {};
            newHeader.field = header.field;
            newHeader.fieldDisplayName = "";
            newHeader.fromFile = false;
            $scope.headers.splice(index + 1, 0, newHeader);
        };
        $scope.removeRule = function(index){
            $scope.headers.splice(index, 1);
        };
		
		$scope.updateRuleOperator = function(index, operator) {
			$scope.headers[index]['operator'] = operator;
			//console.log('op  ',operator);
		}  
    };
    var processHeaders = function($headers){

        var headerObj = [];
        for (var i=0; i<$headers.length; i++){
            var map = {};
            map["field"] = $headers[i];
            map["fieldDisplayName"] = $headers[i];
            map["fromFile"] = true;
            map["rule"] = "";
            map["value"] = "";
			map["operator"]="";
            map["operation"] = "";

            headerObj.push(map);
        }
        // console.log(headerObj);
        return headerObj;
    };

    createCampaignController.$inject = ['$scope','$http'];

    angular.module('campaignAnalyticsApp')
        .controller('createCampaignController', createCampaignController);

}());