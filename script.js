function onloadcheck() {
if (location.pathname == "/") {
var courseGradesNum = [];
var courseGradesID = [];

//Get Grades
fetch(location.protocol+'//'+location.host+location.pathname + 'api/v1/courses?include[]=total_scores&per_page=100&enrollment_state=active',{
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
  var courseEnrollment = obj[i].enrollments[obj[i].enrollments.length -1].computed_current_score;
  if (courseEnrollment == null){
    courseEnrollment = "N/A";
  } else {
    courseEnrollment += "%";
  }
  courseGradesNum.push(courseEnrollment);
  courseGradesID.push(obj[i].name);
}

//Dashboard Stuff
var courseBase = document.getElementsByClassName('ic-DashboardCard__header_hero');
for(var b=0, leng=courseBase.length; b<leng; b++) {
  var courseName = document.getElementsByClassName('ic-DashboardCard__link')[b].children[0].children[0].title;
  for(var a=0, lena=courseGradesID.length; a<lena; a++) {
    if (courseName.includes(courseGradesID[a]) == true) {
      var canvasTitle = document.createElement("h1");
      canvasTitle.style.color = document.getElementsByClassName('ic-DashboardCard__header_hero')[b].style.backgroundColor;
      canvasTitle.style.background = "white";
      canvasTitle.style.borderRadius = "1em";
      canvasTitle.style.display = "inline";
      canvasTitle.style.padding = "5px 15px 5px 15px";
      canvasTitle.style.lineHeight = "65px";
      canvasTitle.style.marginLeft = "10px";
      canvasTitle.style.fontSize = "150%";
      var canvasTitleText = document.createTextNode(courseGradesNum[a]);
      canvasTitle.appendChild(canvasTitleText);
      document.getElementsByClassName('ic-DashboardCard__header_hero')[b].appendChild(canvasTitle);
    }
  }
}
});
}}
window.onload = onloadcheck;
