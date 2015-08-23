// Global variables.
var xamlPage = null;
var courses = null;
var students = null;
var currentStudent = null;
var minMaxToggled = false;
var meansStdDevsToggled = false;

// Constructor.
function onLoaded() {
    xamlPage = document.getElementById('StudentViewPage');
    courses = (xamlPage.content.findname('Courses').text).split(" ");
    students = (xamlPage.content.findname('Students').text).split(" ");
}

function selectStudent(sender) {
    selection = sender.GetValue("Name").replace("_Student_Panel", "")

    if (currentStudent == null) {
        currentStudent = selection;
        toggle();
        return;
    }
    if (selection != currentStudent) {
        toggle();
        currentStudent = selection;
        toggle();
        if (minMaxToggled) { toggleMinMax(); }
    }
}

function toggleMeansStdDevs() {
    if (currentStudent == null) { return; }

    meansStdDevsToggled = meansStdDevsToggled ? false : true;

    courses.forEach(function (entry) {
        stdDevBorder = currentStudent + "_" + entry + "_StdDev_Border";
        meanLine = currentStudent + "_" + entry + "_Mean_Line";

        toggleElement(stdDevBorder);
        toggleElement(meanLine);
    });
}
function toggleMinMax() {
    if (currentStudent == null) { return; }

    highestScore = null;
    lowestScore = null;
    initScores = true;

    minMaxToggled = minMaxToggled ? false : true;

    courses.forEach(function (entry) {
        scoreBorder = xamlPage.content.findname(currentStudent + "_" + entry + "_Score_Border");

        if (initScores) {
            highestScore = scoreBorder;
            lowestScore = scoreBorder;
            initScores = false;
        }

        if (scoreBorder.Height > highestScore.Height) { highestScore = scoreBorder; }
        if (scoreBorder.Height < lowestScore.Height) { lowestScore = scoreBorder; }
    });

    courses.forEach(function (entry) {
        scoreBorder = xamlPage.content.findname(currentStudent + "_" + entry + "_Score_Border");

        if (scoreBorder.Name == highestScore.Name || scoreBorder.Name == lowestScore.Name) {
            scoreBorder.visibility = "Visible";
        } else {
            scoreBorder.visibility = "Collapsed";
        }
    });

    minMaxBorder = xamlPage.content.findname("Min_Max");
    minMaxBorder.text = minMaxToggled ? "Alle vakken" : "Minimum en maximum";
}
function toggleStudentBlock() {
    studentBlock = currentStudent + "_Student_Block";
    currentVisibility = xamlPage.content.findname(studentBlock).visibility;
    toggleElement(studentBlock);
}
function toggleScores() {
    courses.forEach(function (entry) {
        scoreBorder = currentStudent + "_" + entry + "_Score_Border";
        courseText = currentStudent + "_" + entry + "_Text";

        toggleElement(scoreBorder);
        toggleElement(courseText);
    });
}

function toggleElement(element) {
    xamlPage.content.findname(element).visibility = currentVisibility == "Visible" ? "Collapsed" : "Visible";
}

// also serves as reset function
function toggle() {
    toggleStudentBlock();
    toggleScores();
    if (!meansStdDevsToggled) { toggleMeansStdDevs(); }
}