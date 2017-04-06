myApp.service('dataService',['$http', function ($http) {

    function getData() {
        return  $http({
            method: 'GET',
            url: 'https://restcountries.eu/rest/v2/all'
        });
    }

    return {
        getData:getData
    };

}]);