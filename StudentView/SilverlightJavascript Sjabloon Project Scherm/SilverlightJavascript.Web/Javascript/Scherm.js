// Global variables.
var xamlPage = null;

var courses = null;

var students = null;
var currentStudent = null;

var meansStdDevsExposed = false;
var minMaxFocused = false;

var highestScoreBorder = null;
var highestScoreText = null;
var lowestScoreBorder = null;
var lowestScoreText = null;

// Constructor.
function onLoaded() {
    xamlPage = document.getElementById('StudentViewPage');
    courses = (find('Courses').text).split(" ");
    students = (find('Students').text).split(" ");
}

///////////////////////
// student selection //
///////////////////////
function selectStudent(sender) {
    selection = sender.GetValue("Name").replace("_Student_Panel", "");

    if (currentStudent == null) {
        currentStudent = selection;
        set();
        return;
    }
    if (selection != currentStudent) {
        reset();
        currentStudent = selection;
        set();
    }
}
///////////////////////
// student selection //
///////////////////////

///////////////////////////////////
// means and standard deviations //
///////////////////////////////////
function exposeMeansStdDevs() {
    if (currentStudent == null) { return; }

    meansStdDevsExposed = true;

    exposeScores();
}
function hideMeansStdDevs() {
    if (currentStudent == null) { return; }

    meansStdDevsExposed = false;

    exposeScores();
}
function toggleMeansStdDevs() {
    if (currentStudent == null) { return; }

    meansStdDevsExposed ? hideMeansStdDevs() : exposeMeansStdDevs();
}
///////////////////////////////////
// means and standard deviations //
///////////////////////////////////

/////////////////
// min and max //
/////////////////
function focusMinMax() {
    if (currentStudent == null) { return; }

    minMaxFocused = true;

    exposeScores();

    minMaxText = find("Min_Max_Text");
    minMaxText.text = "Alle vakken";
}
function unfocusMinMax() {
    if (currentStudent == null) { return; }

    minMaxFocused = false;

    exposeScores();

    minMaxText = find("Min_Max_Text");
    minMaxText.text = "Minimum en maximum";
}
function toggleMinMax() {
    if (currentStudent == null) { return; }

    minMaxFocused ? unfocusMinMax() : focusMinMax();
}
function setMinMax() {
    initScores = true;

    courses.forEach(function (entry) {
        scoreBorder = find(currentStudent + "_" + entry + "_Score_Border");
        courseText = find(currentStudent + "_" + entry + "_Text");
        stdDevBorder = find(currentStudent + "_" + entry + "_StdDev_Border");
        meanLine = find(currentStudent + "_" + entry + "_Mean_Line");

        if (initScores) {
            highestScoreBorder = scoreBorder;
            highestScoreText = courseText;

            lowestScoreBorder = scoreBorder;
            lowestScoreText = courseText;

            initScores = false;
        }

        if (scoreBorder.Height > highestScoreBorder.Height) {
            highestScoreBorder = scoreBorder;
            highestScoreText = courseText;
        }
        if (scoreBorder.Height < lowestScoreBorder.Height) {
            lowestScoreBorder = scoreBorder;
            lowestScoreText = courseText;
        }
    });
}
/////////////////
// min and max //
/////////////////

///////////////////
// student block //
///////////////////
function exposeStudentBlock() {
    findExposeElement(currentStudent + "_Student_Block");
}
function hideStudentBlock() {
    findHideElement(currentStudent + "_Student_Block");
}
function toggleStudentBlock() {
    toggleElement(currentStudent + "_Student_Block");
}
///////////////////
// student block //
///////////////////

////////////
// scores //
////////////
function exposeScores() {
    hideScores();

    courses.forEach(function (entry) {
        scoreBorder = currentStudent + "_" + entry + "_Score_Border";
        courseText = currentStudent + "_" + entry + "_Text";
        stdDevBorder = currentStudent + "_" + entry + "_StdDev_Border";
        meanLine = currentStudent + "_" + entry + "_Mean_Line";

        if (minMaxFocused && meansStdDevsExposed) {
            if (scoreBorder == highestScoreBorder.Name || scoreBorder == lowestScoreBorder.Name) {
                findExposeElement(scoreBorder);
                findExposeElement(courseText);
                findExposeElement(stdDevBorder);
                findExposeElement(meanLine);
            }
        } else if (minMaxFocused && !meansStdDevsExposed) {
            if (scoreBorder == highestScoreBorder.Name || scoreBorder == lowestScoreBorder.Name) {
                findExposeElement(scoreBorder);
                findExposeElement(courseText);
            }
        } else if (!minMaxFocused && meansStdDevsExposed) {
            findExposeElement(scoreBorder);
            findExposeElement(courseText);
            findExposeElement(stdDevBorder);
            findExposeElement(meanLine);
        } else {    // !minMaxFocused && !meansStdDevsExposed
            findExposeElement(scoreBorder);
            findExposeElement(courseText);
        }
    });
}
function hideScores() {
    courses.forEach(function (entry) {
        scoreBorder = currentStudent + "_" + entry + "_Score_Border";
        courseText = currentStudent + "_" + entry + "_Text";
        stdDevBorder = currentStudent + "_" + entry + "_StdDev_Border";
        meanLine = currentStudent + "_" + entry + "_Mean_Line";

        findHideElement(scoreBorder);
        findHideElement(courseText);
        findHideElement(stdDevBorder);
        findHideElement(meanLine);
    });
}
function toggleScores() {
    courses.forEach(function (entry) {
        scoreBorder = currentStudent + "_" + entry + "_Score_Border";
        courseText = currentStudent + "_" + entry + "_Text";

        toggleElement(scoreBorder);
        toggleElement(courseText);
    });
}
////////////
// scores //
////////////

////////////////
// visibility //
////////////////
function exposeElement(element) {
    element.visibility = "Visible";
}
function hideElement(element) {
    element.visibility = "Collapsed";
}
function findExposeElement(element) {
    find(element).visibility = "Visible";
}
function findHideElement(element) {
    find(element).visibility = "Collapsed";
}
function toggleElement(element) {
    element.visibility == "Visible" ? hideElement(element) : exposeElement(element);
}
////////////////
// visibility //
////////////////

//////////////////
// page control //
//////////////////
function set() {
    meansStdDevsExposed = true;

    setMinMax();
    exposeStudentBlock();
    exposeScores();
}
function reset() {
    hideStudentBlock();
    hideScores();
}
function find(element) {
    return xamlPage.content.findname(element);
}
//////////////////
// page control //
//////////////////