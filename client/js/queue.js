function htmlForSubmission(sub){
  var date = new Date(sub.submitted);
  var s=
  `<div class="row" style="margin: 0;">
    <div class="col s12 m12">
      <div class="card horizontal">
        <div class="card-image valign-wrapper">`
          + (sub.graded ? `<i class="teal-text material-icons small">check_box</i>` : `<i class="red-text material-icons small">clear</i>`) +
        `</div>
        <div class="card-stacked">
          <div class="card-content">
            <div class="row" style="margin: 0;">
              <div class="col s3 center-align">`+sub.username+`</div>
              <div class="col s4 center-align">`+sub.asgn+`</div>
              <div class="col s5 center-align"><i class="material-icons tiny">access_time</i> ` + date.toGMTString() + `</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  return s;
};

function setSubmissions(sub) {
    var subs = JSON.parse(sub);
    console.log(subs);
    for(var i in subs) {
        console.log(subs[i]);
        /*
        var date = new Date(subs[i].submitted);
        $("#submissions").append("Job ID: <b>" + subs[i]._id + "</b>");
        $("#submissions").append("<li> name: " + subs[i].username + "</li>");
        $("#submissions").append("<li> assignment: " + subs[i].asgn + "</li>");
        $("#submissions").append("<li> graded: " + subs[i].graded + "</li>");
        $("#submissions").append("<li> submission time: " + date.toGMTString() + "</li>");
        */
        $("#submissions").append(htmlForSubmission(subs[i]));
    }
}

window.onload = function() {
    GET("./submissions", setSubmissions);
};
