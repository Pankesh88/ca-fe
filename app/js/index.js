$(function() {
    // // set up action process when file is selected
    // $("#dataSetFile").change(function(){
    //    fileSelectProcess(this);
    // });
});

//---------------------------------------------------------------------------------
// fileSelectProcess
//
// File was selected - go straight to the header selection screen
//---------------------------------------------------------------------------------
function fileSelectProcess(el) {
    var files = $(el).prop("files");

    if (FU.getExtension(files[0].name.toLowerCase()) !== 'csv') {
        alert("Must be a CSV file");
        return;
    }

    console.log(files);

    if (FU.exists(files) && files.length > 0) {
        FU.processFile("dataSetFile","file-select-container");
        // $(document).unbind("click").on('click', "#file-select-container #send-file", function(){
        //     sendFile(site,operation,confName);
        // });
        // $(document).on('click', "#send-file-cancel", function(){
        //     cancelHeaderSelect();
        // });
    } else {
        // may have been a "cancel" from file select box
        $("#file-select-container").remove();
    }
}
