function setResults(obj) {
    obj = JSON.parse(obj);
    console.log(obj);
    var date = new Date(obj[1].submitted);
    $("#results").append("Job ID: <b>" + obj[1]._id + "</b>, submitted at " + date.toGMTString() + ". <br>");
    if(obj[0]) $("#results").append("<b> Most recent score: </b>" + obj[0].scores + ". <br>");
}

window.onload = function() {
    GET("../recent/" + $("#asgn").text(), setResults);
};
