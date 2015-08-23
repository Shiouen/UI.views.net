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
    xamlPage = document.getElementById('ClassViewPage');
}
