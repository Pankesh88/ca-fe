(function() {

    var createCampaignController = function ($scope, $http) {

        function init() {
            $scope.showContent = function($fileContent){
                $scope.headers = processHeaders($fileContent);
            };
        }
        init();

        $scope.data = {
            campaignName: "",
            CampaignDescription: "",
            CampaignType: "",
            CampaignDomain: "",
            StartDateTime: new Date(),
            EndDateTime: new Date()
        };


        $scope.submitForm = function() {
            console.log("posting data....");
            console.log(JSON.stringify($scope.headers));
            $scope.data.rules = $scope.headers;
            console.log($scope.data);

            var ruleObj =[];

            // $http.post('http://posttestserver.com/post.php?dir=jsfiddle', JSON.stringify(data)).success(function(){/*success callback*/});
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