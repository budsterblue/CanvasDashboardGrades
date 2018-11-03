var courseGradesNum = [];
var courseGradesID = [];
var canvasURL = window.location.href + 'api/v1/courses?include[]=total_scores&per_page=100&enrollment_state=active'; 
//Get Grades
fetch(canvasURL,{
          method: 'GET',
          credentials: 'include',
          headers: {
               "Accept": "application/json"
          }
     })
    .then(res => res.json())
    .then(data => obj = data)
    .then(function(){

for(var i=0, len=obj.length; i<len; i++) {
    courseGradesNum.push(obj[i].enrollments[0].computed_current_score);
    courseGradesID.push(obj[i].name);
}

//Dashboard Stuff
var courseBase = document.getElementsByClassName('ic-DashboardCard__header_hero');
for(var b=0, leng=courseBase.length; b<leng; b++) {
  var courseName = document.getElementsByClassName('ic-DashboardCard__link')[b].children[0].children[0].title;
  for(var a=0, lena=courseGradesID.length; a<lena; a++) {
    if (courseName.includes(courseGradesID[a]) == true) {
      var canvasTitle = document.createElement("h1");
      canvasTitle.style.color = "white";
      canvasTitle.setAttribute("align", "center");
      var canvasTitleText = document.createTextNode(courseGradesNum[a]);
      canvasTitle.appendChild(canvasTitleText);
      document.getElementsByClassName('ic-DashboardCard__header_hero')[b].appendChild(canvasTitle);
    }
  }
}

});