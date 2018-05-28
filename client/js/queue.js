function htmlForSubmission(sub){
  var date = new Date(sub.submitted);
  var username = $("#email").text().split(" ")[1].split("@")[0];
  var s = '';
  console.log(username);
  if(sub.username !== username) {
      s=
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
  } else {
      s=
      `<div class="row" style="margin: 0;">
        <div class="col s12 m12">
          <div class="card horizontal yellow lighten-3">
            <div class="card-image valign-wrapper">`
              + (sub.graded ? `<i class="teal-text material-icons small">check_box</i>` : `<i class="red-text material-icons small">clear</i>`) +
            `</div>
            <div class="card-stacked">
              <div class="card-content mycard">
                <div class="row" style="margin: 0;">
                  <div class="col s3 center-align">`+sub.username+`</div>
                  <div class="col s4 center-align asgn">`+sub.asgn+`</div>
                  <div class="col s5 center-align"><i class="material-icons tiny">access_time</i> ` + date.toGMTString() + `</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }
  return s;
};

function setSubmissions(sub) {
    var subs = JSON.parse(sub);
    console.log(subs);
    for(var i in subs) {
        console.log(subs[i]);
        $("#submissions").append(htmlForSubmission(subs[i]));
    }

    $(".mycard").click(function() {
        window.location = "/results/" + $(this).find('.asgn').text();
        console.log($(this).find('.asgn').text());
    });

    $(".mycard").hover(function() {
        console.log($(this).closest(".card"));
        $(this).closest(".card").removeClass("lighten-3");
        $(this).closest(".card").addClass("lighten-4");
        $(this).closest(".card").css("cursor", "pointer");
    }, function() {
        $(this).closest(".card").removeClass("lighten-4");
        $(this).closest(".card").addClass("lighten-3");
    });
}

window.onload = function() {
    GET("./submissions", setSubmissions);
};
