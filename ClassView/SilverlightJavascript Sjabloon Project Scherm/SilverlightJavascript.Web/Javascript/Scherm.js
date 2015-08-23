// Global variables.
var xamlPage = null;

var courses = null;
var students = null;

var selectedStudent = null;

var meanFunctionTextBlock = null;
var minFunctionTextBlock = null;
var minScoreTextBlock = null;
var maxFunctionTextBlock = null;
var maxScoreTextBlock = null;

var mean = null;

// Constructor.
function onLoaded() {
    xamlPage = document.getElementById('ClassViewPage');
    courses = (find('Course_List').text.replace(/ /g, "_")).split("|");
    students = (find('Student_List').text.replace(/ /g, "_")).split("|");

    meanFunctionTextBlock = find("Mean_Text_Block");
    minFunctionTextBlock = find("Min_Text_Block");
    maxFunctionTextBlock = find("Max_Text_Block");
}

///////////////////////
// student selection //
///////////////////////
function selectStudent(sender) {
    selection = sender.GetValue("Name").replace("_Border", "");

    if (selection == selectedStudent) {
        deselectStudent();
    } else if (selectedStudent != null) {
        return;
    } else {
        selectedStudent = selection;
        set();
    }
}
function deselectStudent() {
    reset()
}
///////////////////////
// student selection //
///////////////////////

////////////////
// markings ////
////////////////
function markSelected() {
    selectedBorder = find(selectedStudent + "_Border");
    selectedBorder.background = "Red";
}
function unmarkSelected() {
    unmarkMean();
    unmarkMin();
    unmarkMax();

    selectedBorder = find(selectedStudent + "_Border");
    selectedBorder.background = "Gray";
}

function markMean() {
    if (selectedStudent == null) { return; }

    meanFunctionTextBlock.text = "Gemiddelde: " + mean;

    unmarkMin();
    unmarkMax();
}
function unmarkMean() {
    meanFunctionTextBlock.text = "Gemiddelde: ...";
}

function markMin() {
    if (selectedStudent == null) { return; }

    minScoreTextBlock.fontsize = "24";
    minScoreTextBlock.foreground = "Red";

    minFunctionTextBlock.text = "Minimum: " + minScoreTextBlock.text;

    unmarkMean();
    unmarkMax();
}
function unmarkMin() {
    minScoreTextBlock.fontsize = "16";
    minScoreTextBlock.foreground = "Black";
    minFunctionTextBlock.text = "Minimum: ...";
}

function markMax() {
    if (selectedStudent == null) { return; }

    maxScoreTextBlock.fontsize = "24";
    maxScoreTextBlock.foreground = "Red";

    maxFunctionTextBlock.text = "Maximum: " + maxScoreTextBlock.text;

    unmarkMean();
    unmarkMin();
}
function unmarkMax() {
    maxScoreTextBlock.fontsize = "16";
    maxScoreTextBlock.foreground = "Black";
    maxFunctionTextBlock.text = "Maximum: ...";
}
////////////////
// markings ////
////////////////

//////////////////
// page control //
//////////////////
function set() {
    markSelected();
    setMeanMinMax();
}
function reset() {
    unmarkSelected();
    selectedStudent = null;
}
function find(element) {
    return xamlPage.content.findname(element);
}
function setMeanMinMax() {
    setMean();
    setMin();
    setMax();
}
function setMean() {
    sum = 0;
    courses.forEach(function (entry) {
        scoreText = find(selectedStudent + "_" + entry + "_Text_Block");
        sum += parseFloat(scoreText.text);
    });
    mean = (sum / parseFloat(courses.length)).toFixed(2);
}
function setMin() {
    minScore = 20.0;
    courses.forEach(function (entry) {
        scoreTextBlock = find(selectedStudent + "_" + entry + "_Text_Block");
        currentScore = parseFloat(scoreTextBlock.text);
        if (minScore > currentScore) {
            minScore = currentScore;
            minScoreTextBlock = scoreTextBlock;
        }
    });
}
function setMax() {
    maxScore = 0.0;
    courses.forEach(function (entry) {
        scoreTextBlock = find(selectedStudent + "_" + entry + "_Text_Block");
        currentScore = parseFloat(scoreTextBlock.text);
        if (maxScore < currentScore) {
            maxScore = currentScore;
            maxScoreTextBlock = scoreTextBlock;
        }
    });
}
//////////////////
// page control //
//////////////////