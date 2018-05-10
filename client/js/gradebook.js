var num_tests = {
    'Stuffie': 9,
    'Flashlight': 4,
};


function students(obj) {
    obj = JSON.parse(obj);
    console.log(obj);
    createCols(obj);
}

function createCols(obj) {
    var asgn = $("#asgn").text();
    for(var i=1; i<=num_tests[asgn]; ++i) {
        $("#col").append("<th>T"+i+"</th>");
    }
    createTable(obj);
}

function createTable(obj) {
    obj.forEach(function(name) {
        console.log(name);
        GET("../recent/" + $("#asgn").text() + "/" + name, createRow); 
    });
}

function createRow(obj) {
    if(obj) obj = JSON.parse(obj);
    console.log(obj);
    var score = 0;
    var name = obj[1].username;
    console.log("Score", score, "Name", name);
    if(obj[0]) {
        score = obj[0].scores || obj[0].score;
    }
    obj = obj[0];
    var asgn = $("#asgn").text();
    var s = "<td>" + name + "</td><td>" + score + "</td>";
    for(var i=1; i<=num_tests[asgn]; ++i) {
        if(obj.testcases && obj.testcases[i]) {
            s += "<td>"+obj.testcases[i].score+"</td>";
        } else {
            s += "<td></td>";
        }
    }
    $("#row").append("<tr>" + s + "</tr>");
}

window.onload = function() {
    GET("../students", students);
};

