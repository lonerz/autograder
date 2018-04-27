function htmlForAssignment(assgn){
  var s=`<div class="row">
    <div class="col s12 m12">
      <div class="card">
        <div class="card-content">
          <span class="card-title">`+assgn+`</span>
        </div>
        <div class="card-action">
          <a href ="/upload/` + assgn + `">Submit</a>
          <a href ="/results/` + assgn + `">Results</a>
        </div>
      </div>
    </div>
  </div>`;
  return s;

}
function setAssignments(asgnresults) {
    var assgn = JSON.parse(asgnresults);
    console.log(assgn);
    for(var i in assgn) {
      var htmlValue=htmlForAssignment(assgn[i]);
      //var htmlValue='<li class="collection-item"><span class="title">'+assgn[i]+'</span><p><a href="/upload/' + assgn[i] + '">submit</a><br><a href ="/results/' + assgn[i] + '">results</a></p></li>';
        $("#assignments").append(htmlValue);
    }
}

window.onload = function() {
    GET("./assignments", setAssignments);
};
