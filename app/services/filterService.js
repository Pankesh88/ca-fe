myApp.service('filterService', function () {

    this.searched = function (valLists,toSearch) {
        return _.filter(valLists,
            function (i) {
                /* Search Text in all 3 fields */
                return searchUtil(i, toSearch);
            });
    };

    this.paged = function (valLists,pageSize)
    {
        retVal = [];
        for (var i = 0; i < valLists.length; i++) {
            if (i % pageSize === 0) {
                retVal[Math.floor(i / pageSize)] = [valLists[i]];
            } else {
                retVal[Math.floor(i / pageSize)].push(valLists[i]);
            }
        }
        return retVal;
    };

});