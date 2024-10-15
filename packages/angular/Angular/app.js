var app=angular.module('taskApp',['ngAnimate']);

app.controller('TaskController',['$scope','TaskService',function($scope,TaskService) {
    $scope.tasks=TaskService.getTasks();
    $scope.newTask={};

    $scope.addTask=function() {
        var task=angular.copy($scope.newTask);
        task.id=TaskService.addTask(task);
        task.completed=false;
        $scope.tasks.push(task); 
        $scope.newTask={};
    };

    $scope.removeTask=function(task) {
        TaskService.deleteTask(task.id);
        var index=$scope.tasks.indexOf(task);
        if (index !== -1) {
            $scope.tasks.splice(index,1);
        }
    };

    $scope.toggleComplete=function(task) {
        task.completed=!task.completed;
        TaskService.updateTask(task.id,{ completed:task.completed });
    };
}]);

app.service('TaskService',function() {
    var tasks=[];
    var taskId=0;

    this.getTasks=function() {
        return tasks;
    };

    this.addTask=function(task) {
        taskId++;
        task.id=taskId;
        tasks.push(task);
        return task.id;
    };

    this.updateTask=function(id,updates) {
        var task=tasks.find(function(t) { return t.id === id; });
        if (task) {
            angular.extend(task,updates);
        }
    };

    this.deleteTask=function(id) {
        tasks=tasks.filter(function(t) { return t.id !== id; });
    };
});

app.directive('taskItem',function() {
    return {
        restrict:'E',
        scope:{
            task:'='
        },
        template:`
            <div>
                <h3>{{ task.title }}</h3>
                <p>{{ task.description }}</p>
            </div>
        `
    };
});

app.filter('taskFilter',function() {
    return function(tasks,searchText) {
        if (!searchText) return tasks;
        return tasks.filter(function(task) {
            return task.title.toLowerCase().includes(searchText.toLowerCase());
        });
    };
});
