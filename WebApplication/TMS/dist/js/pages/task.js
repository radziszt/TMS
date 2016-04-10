/**
 * Created by Tomasz on 4/5/2016.
 */
(function (ng) {
    'use strict';

    ng.module('task', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/tasks/:taskId', {
                    templateUrl: 'pages/task.html',
                    controller: TaskController,
                    controllerAs: 'tc',
                    resolve: {
                        taskData: function (taskService, $route) {
                            return taskService.getTask($route.current.params.taskId);
                        }
                    }
                });
        })
        .service('taskFunctions', TaskFunctions);

    function TaskController(taskData, taskFunctions, $scope) {
        var tc = this;

        $scope.$watch(function() {
            taskFunctions.getProjectData(taskData);
            tc.taskName = taskData.task.taskName;
            tc.taskId = taskData.task.taskId;
            tc.projectName = taskData.task.projectName;
            tc.type = taskData.task.type;
            tc.priority = taskData.task.priority;
            tc.status = taskData.task.status;
            tc.taskProgress = taskData.task.taskProgress;
            tc.taskDescription = taskData.task.taskDescription;
            tc.createDate = taskData.task.createDate;
            tc.updateDate = taskData.task.updateDate;
            tc.dueDate = taskData.task.dueDate;
            tc.taskComments = taskData.task.taskComments;
            tc.taskAssigneeId = taskData.task.taskAssigneeId;
            tc.taskAssignee = taskData.task.taskAssignee;
            tc.taskReporter = taskData.task.taskReporter;
            tc.taskReporterId = taskData.task.taskReporterId;
        });

        tc.increase = 10;
        tc.decrease = -10;
        tc.setTaskProgress = function setTaskProgress(value){
            taskFunctions.setProgressBarValue(value);
        };

    }

    function TaskFunctions(taskService, $filter){
        var tf = this;

        var taskData;
        tf.getProjectData = function getProjectData(data){
            taskData = data;
        };

        tf.setProgressBarValue = function setProgressBarValue(value){
            if(taskData.task.taskProgress + value <= 100){
                taskData.task.taskProgress += value;
                tf.updateDate();
                taskService.setTask(taskData.task.taskId, taskData.task);
            }
        };

        tf.updateDate = function updateDate(){
            taskData.task.updateDate = $filter('date')(new Date() - 300000000, 'dd/MM/yyyy  HH:mm');
        }

    }

})(window.angular);