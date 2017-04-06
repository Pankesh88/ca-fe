var TableCtrl = myApp.controller('TableController', function ($scope, $filter, filterService, dataService) {



    dataService.getData().then(function(result){

        $scope.pageSize = 30;
        $scope.reverse = false;

        $scope.allItems = result.data;

        $scope.resetAll = function () {
            $scope.filteredList = $scope.allItems;
            $scope.newEmpId = '';
            $scope.newName = '';
            $scope.newEmail = '';
            $scope.searchText = '';
            $scope.currentPage = 0;
            $scope.Header = ['','',''];
        };

        $scope.search = function () {
            $scope.filteredList = filterService.searched($scope.allItems, $scope.searchText);

            if ($scope.searchText == '') {
                $scope.filteredList = $scope.allItems;
            }
            $scope.pagination();
        };

        // Calculate Total Number of Pages based on Search Result
        $scope.pagination = function () {
            $scope.ItemsByPage = filterService.paged( $scope.filteredList, $scope.pageSize );
        };

        $scope.setPage = function () {
            $scope.currentPage = this.n;
        };

        $scope.firstPage = function () {
            $scope.currentPage = 0;
        };

        $scope.lastPage = function () {
            $scope.currentPage = $scope.ItemsByPage.length - 1;
        };

        $scope.range = function (input, total) {
            var ret = [];
            if (!total) {
                total = input;
                input = 0;
            }
            for (var i = input; i < total; i++) {
                if (i != 0 && i != total - 1) {
                    ret.push(i);
                }
            }
            return ret;
        };

        $scope.sort = function(sortBy){
            $scope.resetAll();

            $scope.columnToOrder = sortBy;

            //$Filter - Standard Service
            $scope.filteredList = $filter('orderBy')($scope.filteredList, $scope.columnToOrder, $scope.reverse);

            if($scope.reverse)
                iconName = 'glyphicon glyphicon-chevron-up';
            else
                iconName = 'glyphicon glyphicon-chevron-down';

            if(sortBy === 'name')
            {
                $scope.Header[0] = iconName;
            }
            else if(sortBy === 'population')
            {
                $scope.Header[1] = iconName;
            }else {
                $scope.Header[2] = iconName;
            }

            $scope.reverse = !$scope.reverse;

            $scope.pagination();
        };

        //By Default sort ny Name
        $scope.sort ('name');
    });


});

//Inject Services for DI
//$scope is standard service provided by framework
//If we want to use standard $Filter, It also needs to be injected
//filteredService - custom created by me
TableCtrl.$inject = ['$scope', '$filter', 'filterService', 'dataService'];