function setSubmissions(sub) {
    var subs = JSON.parse(sub);
    console.log(subs);
    for(var i in subs) {
        console.log(subs[i]);
        var date = new Date(subs[i].submitted);
        $("#submissions").append("<ul>");
        $("#submissions").append("Job ID: <b>" + subs[i]._id + "</b>");
        $("#submissions").append("<li> name: " + subs[i].username + "</li>");
        $("#submissions").append("<li> assignment: " + subs[i].asgn + "</li>");
        $("#submissions").append("<li> graded: " + subs[i].graded + "</li>");
        $("#submissions").append("<li> submission time: " + date.toGMTString() + "</li>");
        $("#submissions").append("</ul>");
    }
}

window.onload = function() {
    GET("./submissions", setSubmissions);
};
