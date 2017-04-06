
//---------------------------------------------------------------------------------
//FileUtil.js
//
// Javascript support for file realated operations
//---------------------------------------------------------------------------------

var FU = null;

$(function() {
    FU = new FileUtils();
});

function FileUtils () {

    this.CALLBACKS = [];

    //-----------------------------------------------------------
    // Init
    //
    // Calls the server to get configuration values
    //-----------------------------------------------------------

    var that = this;

    var i;

    // helper function
    this.exists = function(a) {return (a!==undefined && a!==null)};

    //-----------------------------------------------------------
    // Ready
    //
    // queues the provided function to callback after initialization
    //-----------------------------------------------------------
    this.ready = function(cb) {
        this.CALLBACKS.push(cb);
    };

    //---------------------------------------------------------------------------------
    // extractMetadataFromFields
    // looks for key, label, and value (.val())
    //---------------------------------------------------------------------------------
    this.extractMetadataFromFields = function(sel, keyPrefix) {
        var meta = {};

        $(sel).each(function() {
            tobj = {};
            var mapping = $('option:selected', this).attr("data-mapping");
            key = $(this).attr("key").replace(keyPrefix, "");
            tobj.header = $(this).attr("label");
            if(exists(mapping)){
                tobj.mapping = mapping;
            }
            tobj.action = $(this).val();
            meta[key] = tobj;
        });

        return meta;
    };

    //---------------------------------------------------------------------------------
    // extractMetadataFromFields
    // looks for key, label, and value (.val())
    //---------------------------------------------------------------------------------
    this.extractMetadata = function(sel, keyPrefix) {
        var meta = [];

        $(sel).each(function() {
            tobj = {};
            var mapping = $('option:selected', this).attr("data-mapping");
            key = $(this).attr("key").replace(keyPrefix, "");
            tobj.header = $(this).attr("label");
            if(exists(mapping)){
                tobj.mapping = mapping;
            }
            tobj.action = $(this).val();
            meta.push(tobj);
        });

        return meta;
    };

    //---------------------------------------------------------------------------------
    // selectProps
    //
    // create an array of the global header properties (HDR_MAP and HDR_ACTION)
    // that contain the selId passed in
    //
    //---------------------------------------------------------------------------------
    this.selectProps = function(allProps, selId) {
        var props = [];

        for (i=0; i < allProps.length; i++) {
            if (selId in allProps[i]) {
                props.push(allProps[i]);
            }
        }
        return props;
    };

    //---------------------------------------------------------------------------------
    // inProps
    //
    // determine if the given object property is represented in the array of property objects
    //
    //---------------------------------------------------------------------------------
    this.inProps = function(props, prop, val) {
        var i;
        for (i=0; i<props.length; i++) {
            if (props[i][prop] == val) {
                return true;
            }
        }
        return false;
    };

    this.getURLParam=function(name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results) {
            return results[1] || 0;
        } else {
            return "";
        }
    };

    //---------------------------------------------------------------------------------
    // getExtension
    //
    // to get the file extension
    //
    //---------------------------------------------------------------------------------
    this.getExtension = function(filename) {
        var strArray = filename.split(".");
        if (strArray.length > 1) {
            return strArray[strArray.length - 1];
        }
        return "";
    };
    //---------------------------------------------------------------------------------
    // displayFilename
    //
    // Modify File name to show it is processing window
    //---------------------------------------------------------------------------------

    this.displayFilename = function(filename){
        if(filename.indexOf(".csv") > -1){
            filename = filename.replace(".csv", "");
            if(filename.length > 15){
                return filename.substr(0,8) + ".." + filename.substr(filename.length - 7);
            } else {
                return filename;
            }
        } else {
            return filename;
        }
    };

    this.validateCommonMetadata = function(metaData, site, operation,confName){

        logger(site, operation);
        var i;
        var pcnt = {};
        var headerMapping = metaData.headerMapping;
        var requiredProps = FU.selectProps(FU.HDR_PROPS[operation], "required");
        var requiredBatch = FU.selectProps(FU.BATCH_DATA[confName], "required");
        var allProps = FU.HDR_PROPS[operation].slice();
        var allowMultipleProps = FU.selectProps(FU.HDR_PROPS[operation], "allow_multiple");
        for (key in headerMapping) {
            rec = headerMapping[key];
            if (exists(rec.mapping)) {
                if (exists(pcnt[rec.mapping])) {
                    pcnt[rec.mapping]++;
                } else {
                    pcnt[rec.mapping] = 1;
                }
            }
        }

        for (i=0; i < requiredBatch.length; i++) {
            var optionSelected = $("#" + requiredBatch[i].key).find(":selected").attr("key");
            if (optionSelected == "" || optionSelected == "select"){
                return("Please select " + requiredBatch[i].label);
            }
        }

        for (i=0; i < requiredProps.length; i++) {
            if (!exists(pcnt[requiredProps[i].mapping])) {
                return ("Required mapping to property [" + requiredProps[i].label + "] not present");
            }
        }


        // check for unique fields
        for (i=0; i < allProps.length; i++) {
            if (exists(pcnt[allProps[i].mapping]) && pcnt[allProps[i].mapping] > 1) {
                if (allowMultipleProps.indexOf(allProps[i]) == -1){
                    return ("You must only map one column to the property [" + allProps[i].label + "]");
                }
            }
        }

        return null;
    };

    this.processFile1 = function(id, containerId){
        var f,
            myReader,
            blob,
            chunkSize,
            files;

        files = $("#" + id).prop("files");
        f = files[0];
        myReader = new FileReader();

        chunkSize = Math.min(1000, f.size);  // only read 1k bytes looking for header
        blob = f.slice(0, chunkSize);
        myReader.onload = function(e){ FU.processHeaders(e, id, containerId) };
        myReader.readAsText(blob);
    };

    this.processFile = function(e){
        var f,
            myReader,
            blob,
            chunkSize,
            files;

        files = e.prop("files");
        f = files[0];
        myReader = new FileReader();

        chunkSize = Math.min(1000, f.size);  // only read 1k bytes looking for header
        blob = f.slice(0, chunkSize);
        myReader.onload = function(e){ FU.processHeaders(e) };
        myReader.readAsText(blob);
    };

    this.processHeaders = function(e){
        var buffer = e.srcElement.result; //arraybuffer object
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
            alert ("Empty CSV File or CSV file with only header information and no data selected.");
            e.prop("value", null);
            return;
        }

        firstLine = buffer.substr(0, eolIndex);
        headers = $.csv.toArray(firstLine);
        console.log(headers);
        return headers;

        // FU.createHeaderSelectors(containerId,headers);
    };

    this.createHeaderSelectors = function(id, headers){
        var i,
            headerRecs = [],
            html,
            el;

        // First we build an array of header records, one for each column we identified
        // we create an id for each header to use for DOM elements, and store the label
        for (var i = 0; i < headers.length; i++) {
            headerRecs.push({
                label: headers[i],
                // TODO: better regex to deal with whitespace
                key: "ghid-" + headers[i].toLowerCase().replace(/ /gi, "-")
            });
        }
        // use the ejs template and add to the DOM
        // delete any existing element first
        $("#" + id + " .header-select-box").remove();

        // template for creating the header selection GUI

        var template = new EJS({url: "/templates/headerselect.ejs"});

        // propsels are the property selector options for each header
        // build the html from the headerReccords, Property selection options, and global selection options from config
        html = template.render({headerRecs: headerRecs, site: "site", propsels: FU.HDR_PROPS[operation], globHeaders: FU.BATCH_DATA[confName]});
        $("#" + id).append(html);
    };

    // capitalizeFirstLetter
    // Used for Upper caps first letter of a word
    this.capitalizeFirstLetter = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // stripHtml
    // this functions strip html tags from a string.

    this.stripHtml = function(str){
        var regex = /(<([^>]+)>)/ig;
        return str.replace(regex, "");
    };

    //---------------------------------------------------------------------------------
    // getPinData
    // this functions helps create pin data.
    //---------------------------------------------------------------------------------

    this.getPinData = function(keyword,contentHandle,ordinal,engine){
        var pinData = [];
        var item = {};
        item ["keyword"] = keyword;
        item ["contentHandle"] = contentHandle;
        item ["ordinal"] = ordinal;
        item ["engine"] = engine;
        pinData.push(item);
        console.log(pinData);
        return pinData;
    };

    //---------------------------------------------------------------------------------
    // dartPinData
    //
    // this functions makes a post call and gets data
    //---------------------------------------------------------------------------------

    this.dartPinData = function(metaData,dartOperation,pinData){
        var uri = "/batch";
        return $.ajax({
            url: "/sapi/multi-part-post",
            dataType: "json",
            data: {uri: uri, type: "POST", meta: JSON.stringify(metaData), operation: dartOperation , data: JSON.stringify(pinData)},
            type: "POST"
        });
    };

    //---------------------------------------------------------------------------------
    // pushToORCA
    //
    // this function makes a post call and pushes data to ORCA
    //---------------------------------------------------------------------------------

    this.pushToORCA = function(){
        var uri = "/batch";
        return $.ajax({
            url: "/sapi/cache-invalidate",
            dataType: "json",
            type: "POST",
            success: function(obj) {
                if (obj.status == "success") {
                    console.log(obj);
                    vgGUI.alertBox("Push to ORCA was successful.");
                } else {
                    vgGUI.alertBox("Push to ORCA was not successful.");
                }
            },
            error: function() {
                vgGUI.alertBox("Error : Backend might not be up.");
            }
        });
    };


    //---------------------------------------------------------------------------------
    // getMetaData
    //
    // this functions creates metadata object
    //---------------------------------------------------------------------------------

    this.getMetaData  =function(dartOperation,pinDomain){

        var metaData = {};

        var headerMapping = [
            {"header":"keyword","mapping":"keyword","action":"map"},
            {"header":"contentHandle","mapping":"contentHandle","action":"map"},
            {"header":"ordinal","mapping":"ordinal","action":"map"},
            {"header":"engine","mapping":"engine","action":"map"}];
        var source = "expansion";
        var algorithm = "search";

        metaData["pinDomain"] = pinDomain;
        metaData["type"]  = dartOperation;
        metaData["corpus"]  = pinDomain.split(".")[1];
        metaData["headerMapping"]  = headerMapping;
        metaData["source"]  = source;
        metaData["algorithm"]  = algorithm;

        console.log(metaData);
        return metaData;
    };

}


