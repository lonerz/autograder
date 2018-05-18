function htmlForTestcase(sub){
  var s=
  `<li>
    <div class="collapsible-header" style="display: block;">
        <div class="row" style="margin: 0;">
          <div class="col s1 center-align">`+ (sub.score === 1 ? `<i class="teal-text material-icons small">check_box</i>` : `<i class="red-text material-icons small">clear</i>`) +`</div> 
          <div class="col s1 center-align">`+sub.id+`</div>
          <div class="col s2 center-align">`+sub.result+`</div>
          <div class="col s4 center-align">`+sub.des+`</div>
          <div class="col s4 center-align">`+sub.error+`</div>
        </div>
    </div>
    <div class="collapsible-body"><pre>` +
    (sub.tb !== undefined ? sub.tb : 'No traceback found.') + `
    </pre></div>
   </li>`;
  return s;
};

function setResults(obj) {
    obj = JSON.parse(obj);
    console.log(obj);
    var date = new Date(obj[1].submitted);
    $("#des").append("Job ID: <b>" + obj[1]._id + "</b>, submitted at " + date.toGMTString() + ". <br><br>");
    if(obj[0] && obj[0].result !== 'NA') $("#des").append("Most recent score: <b>" + obj[0].score + "</b>. <br>There should be " + obj[0].num_tests + " testcases. If not, assume the testcases missing got an error/wrong answer and ask Josh for more details.");
    else {
        var msg = "Most recent score: <b>0</b>. Compile error OR time limit exceeded on one test. <br>Make sure your code actually compiles (look below for errors). Then, ask Josh for help.<br>";
        if(obj[0].error) {
            console.log("ERR");
            msg += "<pre>" + obj[0].error + "</pre>";
        }
        $("#des").append(msg);
        if(obj[0].tb) {
            $("#des").append("<pre>" + obj[0].tb + "</pre>")
        }
        return;
    }

    var testcases = obj[0].testcases;
    for(var i in testcases) {
        var testcase = testcases[i];
        testcase.id = i;
        if(testcase.error) {
            testcase.result = 'Error';
        } else {
            testcase.error = '';
        }
        if(testcase.result === 'AC') {
            testcase.result = 'Correct';
        }
        if(testcase.result === 'WA') {
            testcase.result = 'Wrong';
        }
        $("#results").append(htmlForTestcase(testcase));
    }
}

$(document).ready(function(){
    $('.collapsible').collapsible();
});

window.onload = function() {
    GET("../recent/" + $("#asgn").text(), setResults);
};
