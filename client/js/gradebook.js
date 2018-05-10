function students(obj) {
    obj = JSON.parse(obj);
    console.log(obj);
    createTable(obj);
}

function createTable(obj) {
    obj.forEach(function(name) {
        console.log(name);
        GET("../recent/" + $("#asgn").text() + "/" + name, createRow); 
    });
}

function createRow(obj) {
    if(obj) obj = JSON.parse(obj);
    console.log(obj);
    var score = 0;
    var name = obj[1].username;
    console.log("Score", score, "Name", name);
    if(obj[0]) {
        score = obj[0].scores || obj[0].score;
    }
    $("#add").append("<tr><td>" + name + "</td><td>" + score + "</td></tr>");
}

function setResults(obj) {
    obj = JSON.parse(obj);
    console.log(obj);
    var date = new Date(obj[1].submitted);
    $("#results").append("Job ID: <b>" + obj[1]._id + "</b>, submitted at " + date.toGMTString() + ". <br>");
    if(obj[0]) $("#results").append("<b> Most recent score: </b>" + obj[0].score + ". <br>");
}

window.onload = function() {
    GET("../students", students);
    // GET("../recent/" + $("#asgn").text(), setResults);
};

