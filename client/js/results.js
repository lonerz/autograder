function setResults(obj) {
    obj = JSON.parse(obj);
    console.log(obj);
    $("#results").append("<b> Most recent score: </b>" + obj.scores + ". <br>");
}

window.onload = function() {
    GET("http://localhost:8000/recent/" + $("#asgn").text(), setResults);
};

