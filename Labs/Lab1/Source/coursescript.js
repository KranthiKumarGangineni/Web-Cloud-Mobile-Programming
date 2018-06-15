var app = angular.module('courseRegApp', []);

app.controller('courseRegCtrl', function($scope) {

    //  Below Lists Will be iterated in Htmls using Angular JS
    $scope.educationlevels = ["Bachelors", "Masters"];
    $scope.semesters = ["Fall", "Spring", "Summer"];
    $scope.yearsOfStudy = [2018,2019];
    $scope.careerOptions = ["Arts", "Music", "Computer Science", "Law", "Electronics", "Psychology"];
    $scope.availableSeats = [{text:'Total Seats', seats:40},{text:'Available Seats', seats: 14}];

    $scope.searchForCourses = function () {
        window.location = "Courses.html";
    };
    
    $scope.signOut = function () {
        window.location = "StudentLoginPage.html";
    };

    $scope.enrollForCourse = function (courseName) {
        window.location.href = "CourseEnroll.html";
    };

    // Function to Enroll/Drop for a Course
    $scope.enrollOrDrop = function (event) {
        $scope.modifiedSeats = [];

        // If Event is Enroll, then Modifying the Available Seats
        if(event.target.innerHTML == 'Enroll'){
            $scope.availableSeats.forEach(function (value) {
                if(value.text == 'Available Seats'){
                    // Decreasing the Available Seats
                    value.seats = value.seats-1;
                }
                $scope.modifiedSeats.push(value);
            });
            $scope.availableSeats = $scope.modifiedSeats;
            // Showing a Success Message
            $("#successEnrolling").text("Congrats, You have Successfully Enrolled into the Course");
            // Changing the Button text to Drop
            $("#course1Enroll").text('Drop');
        }else{
            // Else, if Button Event is Drop
            $scope.availableSeats.forEach(function (value) {
                if(value.text == 'Available Seats'){
                    // Increasing the Available Seats on Click of Drop
                    value.seats = value.seats+1;
                }
                $scope.modifiedSeats.push(value);
            });
            $scope.availableSeats = $scope.modifiedSeats;
            // Showing Success message of Dropping the class
            $("#successEnrolling").text("Congrats, You have Successfully Dropped from the Course");
            // Changing the button text to Enroll
            $("#course1Enroll").text('Enroll');
        }
    };

});

// Function for Greeting, checks if the local Storage email Id is present or not
// Else, it will greet as 'Guest'
$(function() {
    // Setting Greeting for Signed In user
    var signedInUser = null;
    var loginEmail = localStorage.getItem("emailId");
    if(loginEmail != null){
        signedInUser = loginEmail;
    } else {
        signedInUser = "Guest";
    }
    var greeting = "Hi, "+signedInUser;
    $("#homePage").html(greeting);

});