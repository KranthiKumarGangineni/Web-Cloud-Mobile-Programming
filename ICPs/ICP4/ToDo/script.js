
var app = angular.module('toDoApp', ['ngSanitize']);
app.controller('toDoController', function($scope) {
    // Default ToDo List
    $scope.todoList = [{todoText:'Jquery', status:'Pending'},{todoText:'Javascript', status:'Pending'},
        {todoText:'AngularJs', status:'Pending'}];
    updateTotal();

    $scope.addItem = function() {
        $scope.todoList.push({todoText:$scope.newitem, status:'Pending'});
        $scope.newitem = "";
        $("#item").focus();
        updateTotal();
    };

    // Modifying Pending to Done
    $scope.changeToDone = function (event) {
      angular.element(event.target).parent().append("<span class='label success'>Done!</span>");
        angular.element(event.target).parent().attr("class", 'completed');
        angular.element(event.target).remove();
        updateTotal();
    };

    function updateTotal() {

        var completed = $('.success').length;
        var pending = $('.pending').length;
        if (completed > 0 || pending > 0) {
            $scope.totalText = " Pending: " + pending + " Completed: " + completed;
        }
    };

});
