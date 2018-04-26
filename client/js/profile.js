function setAssignments(asgn) {
    var assgn = JSON.parse(asgn);
    console.log(assgn);
    for(var i in assgn) {
        $("#assignments").append("<b>" +assgn[i] + ": </b>" + "<a href='/upload/" + assgn[i] + "'>submit</a> / <a href ='/results/" + assgn[i] + "'>results</a> <br>");
    }
}

window.onload = function() {
    GET"./assignments", setAssignments);
};

