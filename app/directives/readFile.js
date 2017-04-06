(function () {
    angular.module('campaignAnalyticsApp')
        .directive('onReadFile', function ($parse) {
            return {
                restrict: 'A',
                scope: false,
                link: function (scope, element, attrs) {
                    var fn = $parse(attrs.onReadFile);

                    element.on('change', function () {

                        var files = $(element).prop("files");

                        if (FU.exists(files) && files.length > 0) {

                            // Before loading checking for file extension
                            if (FU.getExtension(files[0].name.toLowerCase()) !== 'csv') {
                                alert("Must be a CSV file");
                                element.prop("value", null);
                                scope.$apply(function () {
                                    fn(scope, {$fileContent: ""});
                                });
                                return;
                            }

                            var reader = new FileReader();
                            var f = files[0];
                            var chunkSize = Math.min(1000, f.size);  // only read 1k bytes looking for header
                            var blob = f.slice(0, chunkSize);

                            reader.onload = function (onLoadEvent) {

                                var buffer = onLoadEvent.srcElement.result; //arraybuffer object
                                var eolIndex;
                                //
                                // Try to grab the headers
                                //
                                // Use jquery-csv library to parse the CSV (handles escapes, etc.)
                                //
                                eolIndex = buffer.indexOf('\n');
                                if (eolIndex < 0) {
                                    eolIndex = buffer.indexOf('\r');
                                }
                                if (eolIndex === -1) {
                                    alert("Empty CSV File or CSV file with only header information and no data selected.");
                                    e.prop("value", null);
                                    return;
                                }

                                firstLine = buffer.substr(0, eolIndex);
                                headers = $.csv.toArray(firstLine);
                                console.log(headers);
                                scope.$apply(function () {
                                    fn(scope, {$fileContent: headers});
                                });
                            };

                            reader.readAsText(blob);

                        } else {
                            // TODO: Someday we will do something awesome here.
                        }

                    });
                }
            };
        });


}());
