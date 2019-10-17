//taken from https://www.w3schools.com/xml/xml_http.asp
function loadJSON(callback) {   
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    //will need to change path
    xobj.open('GET', './styles/manifest.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
 
function init() {
    loadJSON(function(response) {
        let actual_JSON = JSON.parse(response);
        //check if they want to edit through the manifest.json for badging
        if(actual_JSON.settings.badging_css == "true") {
            for(let x in actual_JSON.settings.manual_custom_css){
                for(let y in actual_JSON.settings.manual_custom_css[x]){
                    $(x).css(y, actual_JSON.settings.manual_custom_css[x][y]);
                }
            }
        }
        else {
        }
    });
}

function main() {
    init();
}

main();