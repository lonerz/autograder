function waitForUpload(asgn) {
    console.log(JSON.parse(asgn));
    asgn = JSON.parse(asgn);
    if(asgn.statusMsg === "Created directory" || asgn.statusMsg === "Found directory") {
        $('button[type="submit"]').removeAttr("disabled");
    }
}

window.onload = function() {
    var asgn = $("#asgn").text();
    var username = $("#email").text().split(' ')[1].split("@")[0];
    GET("../api/open/" + username + "/" + asgn + "/", waitForUpload);
};
