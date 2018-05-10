function htmlForAssignment(assgn){
  var s=
  `<div class="row">
    <div class="col s12 m12">
      <div class="card">
        <div class="card-content">
          <span class="card-title">`+assgn+`</span>
        </div>
        <div class="card-action">
          <a href ="/gradebook/` + assgn + `">Gradebook</a>
          <a href ="/gradebook/` + assgn + `">Upload</a>
        </div>
      </div>
    </div>
  </div>`;
  return s;
};

function setAssignments(asgnresults) {
    var assgn = JSON.parse(asgnresults);
    console.log(assgn);
    for(var i in assgn) {
        var htmlValue = htmlForAssignment(assgn[i]);
        $("#assignments").append(htmlValue);
    }
}

window.onload = function() {
    GET("./assignments", setAssignments);
};
