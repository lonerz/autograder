function GET(url, callback, params) {
    if(!params) params = "";
    var http = new XMLHttpRequest();
    http.open("GET", url);
    http.onreadystatechange = function() {
        //Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            callback(http.responseText);
        }
    }
    http.send(params);
}

