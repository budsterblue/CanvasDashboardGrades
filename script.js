// make sure the code is running on the dashboard page
if (location.pathname == "/") {

// fetch grades using the official rest api
fetch(location.protocol + '//' + location.host + '/api/v1/courses?include[]=total_scores&per_page=100&enrollment_state=active', {
          method: 'GET',
          credentials: 'include',
          headers: {
               "Accept": "application/json"
          }
     })
    .then(res => res.json()) // unused but necessary for some reason
    .then(data => obj = data)
    .then(function(){

var courseGrades = new Map();

// loop through all actively enrolled courses
for (course of obj) {
  // get a current course's grade
  let courseGrade = course.enrollments[course.enrollments.length -1].computed_current_score;
  // add course id and grade to map, adding a percent sign to grade or setting to N/A if null (no grade)
  courseGrades.set(course.id, (courseGrade == null) ? "N/A" : courseGrade + "%");
}

// only display grades once the page is loaded
function onloadcheck() {
  // display grades on the dashboard
  for (elem of document.getElementsByClassName('ic-DashboardCard__header')) {
    // get the element that will be the parent of the element we are about to create
    let courseHeader = elem.querySelector('.ic-DashboardCard__header_hero');
    // create the visible element
    let gradeElem = document.createElement("h1");
    // style the element
    gradeElem.setAttribute("style", "color: " + courseHeader.style.backgroundColor + `; background: white; border-radius: 1em;
      display: inline; padding: 5px 15px 5px 15px; line-height: 65px; margin-left: 10px; font-size: 150%;`);
    // get course id from DOM and use it to pull the correct grade from the map
    let courseID = parseInt(elem.querySelector('.ic-DashboardCard__link').href.split("/").pop());
    gradeElem.innerHTML = courseGrades.get(courseID);
    // add the element to the DOM
    courseHeader.appendChild(gradeElem);
  }
}
window.onload = onloadcheck;
});
}
