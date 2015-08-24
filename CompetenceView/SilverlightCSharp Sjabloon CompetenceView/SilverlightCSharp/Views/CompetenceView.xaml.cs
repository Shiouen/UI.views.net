using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media.Animation;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace SilverlightCSharp.Views {
    public partial class CompetenceView : Page {
        private bool firstAnimation;
        private string student;
        private string previousStudent;
        private Duration animationDuration;

        public CompetenceView() {
            InitializeComponent();
            this.animationDuration = new Duration(new TimeSpan(0, 0, 2));
            this.firstAnimation = true;
        }
        
        private void SelectStudent(object sender, MouseButtonEventArgs e) {
            Border studentBorder = (Border) sender;
            string student = studentBorder.Name.Replace("_Text_Block", "");
            this.Set(student);
        }

        private void Set(string student) {
            if (!this.firstAnimation) {
                this.previousStudent = this.student;
            }
            this.student = student;

            this.SetStudentNameBlock();
            this.ExposeStudentLines();

            if (!this.firstAnimation) {
                this.HidePreviousStudentLines();
            }
            this.firstAnimation = false;
        }

        private void SetStudentNameBlock() {
            this.StudentNameBlock.Text = this.student.Replace("_", " ");
            this.StudentNameBlock.Visibility = Visibility.Visible;
        }

        private void ExposeStudentLines() {
            TimeSpan beginTime = new TimeSpan(0, 0, 0);

            string baseXName;

            Line line;
            int[] lineCoords = new int[4];

            Storyboard storyBoard;
            DoubleAnimation animation;

            string[] competenceLines = { "Management_Communiceren", "Management_Implementatie", "AnalyseOntwerp_Implementatie", "AnalyseOntwerp_Communiceren" };
            for (int i = 1; i < 5; i++) {
                baseXName = this.student + "_" + competenceLines[i - 1];

                line = (Line)this.FindName(baseXName);
                lineCoords[0] = (int) line.X1;
                lineCoords[1] = (int) line.X2;
                lineCoords[2] = (int) line.Y1;
                lineCoords[3] = (int) line.Y2;
                line.Visibility = Visibility.Visible;

                storyBoard = (Storyboard) this.FindName(baseXName + "_SB");

                for (int j = 1; j < 5; ++j) {
                    animation = (DoubleAnimation) this.FindName(baseXName + "_A" + j);
                    animation.Duration = this.animationDuration;
                    animation.BeginTime = beginTime;
                    animation.From = 0;
                    animation.To = lineCoords[j - 1];
                }
                storyBoard.Begin();
            }
        }

        private void HidePreviousStudentLines() {
            if (this.previousStudent == null) { return; }

            TimeSpan beginTime = new TimeSpan(0, 0, 2);

            string baseXName;

            Line line;
            int[] lineCoords = new int[4];

            Storyboard storyBoard;
            DoubleAnimation animation;

            string[] competenceLines = { "Management_Communiceren", "Management_Implementatie", "AnalyseOntwerp_Implementatie", "AnalyseOntwerp_Communiceren" };
            for (int i = 1; i < 5; i++) {
                baseXName = this.previousStudent + "_" + competenceLines[i - 1];

                line = (Line)this.FindName(baseXName);
                lineCoords[0] = (int) line.X1;
                lineCoords[1] = (int) line.X2;
                lineCoords[2] = (int) line.Y1;
                lineCoords[3] = (int) line.Y2;

                storyBoard = (Storyboard) this.FindName(baseXName + "_SB");

                for (int j = 1; j < 5; ++j) {
                    animation = (DoubleAnimation) this.FindName(baseXName + "_A" + j);
                    animation.Duration = this.animationDuration;
                    animation.BeginTime = beginTime;
                    animation.From = lineCoords[j - 1];
                    animation.To = 700;
                }
                storyBoard.Begin();
            }
        }
    }
}