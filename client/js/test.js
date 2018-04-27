console.log("Hello World!");

var a = function() {
    var http = new XMLHttpRequest();
    var url = "./api/poll/test/assessment1/result.out/";
    var params = "";
    http.open("GET", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function() {
        //Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }

    http.send(params);
    console.log("yo");
};
