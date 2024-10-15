// Define the AngularJS module
var app = angular.module('taskApp', ['ngAnimate']);

// Controller
app.controller('TaskController', ['$scope', 'TaskService', function($scope, TaskService) {
    $scope.tasks = TaskService.getTasks(); // Fetch tasks from the service
    $scope.newTask = {};

    // Add a new task
    $scope.addTask = function() {
        var task = angular.copy($scope.newTask);
        task.id = TaskService.addTask(task); // Add task and get the generated ID
        task.completed = false;
        $scope.tasks.push(task); // Add to the list of tasks
        $scope.newTask = {}; // Clear input fields
    };

    // Remove a task
    $scope.removeTask = function(task) {
        TaskService.deleteTask(task.id);
        var index = $scope.tasks.indexOf(task);
        if (index !== -1) {
            $scope.tasks.splice(index, 1);
        }
    };

    // Toggle task completion
    $scope.toggleComplete = function(task) {
        task.completed = !task.completed;
        TaskService.updateTask(task.id, { completed: task.completed });
    };
}]);

// Service for Local Task Management
app.service('TaskService', function() {
    var tasks = [];
    var taskId = 0;

    // Get all tasks
    this.getTasks = function() {
        return tasks;
    };

    // Add a task
    this.addTask = function(task) {
        taskId++; // Increment the task ID for uniqueness
        task.id = taskId;
        tasks.push(task);
        return task.id;
    };

    // Update a task
    this.updateTask = function(id, updates) {
        var task = tasks.find(function(t) { return t.id === id; });
        if (task) {
            angular.extend(task, updates); // Update task properties
        }
    };

    // Delete a task
    this.deleteTask = function(id) {
        tasks = tasks.filter(function(t) { return t.id !== id; });
    };
});

// Directive for displaying task
app.directive('taskItem', function() {
    return {
        restrict: 'E',
        scope: {
            task: '='
        },
        template: `
            <div>
                <h3>{{ task.title }}</h3>
                <p>{{ task.description }}</p>
            </div>
        `
    };
});

// Filter to search tasks
app.filter('taskFilter', function() {
    return function(tasks, searchText) {
        if (!searchText) return tasks;
        return tasks.filter(function(task) {
            return task.title.toLowerCase().includes(searchText.toLowerCase()) ||
                   task.description.toLowerCase().includes(searchText.toLowerCase());
        });
    };
});
