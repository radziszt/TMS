/**
 * Created by Tomasz on 4/6/2016.
 */
(function (ng) {
    'use strict';

    ng.module('project', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/projects/:projectId', {
                    templateUrl: 'pages/project.html',
                    controller: ProjectController,
                    controllerAs: 'pc',
                    resolve: {
                        projectData: function (projectService, $route) {
                            return projectService.getProject($route.current.params.projectId);
                        },
                        taskList: function (taskService) {
                            return taskService.getTaskList();
                        }
                    }
                });
        })
        .service('projectFunctions', ProjectFunctions);

    function ProjectController(projectData, taskList, projectFunctions, $scope) {
        var pc = this;

        pc.taskList = taskList;

        setTimeout(function(){
            $('#projectTaskList').DataTable({
                pageLength: 25
            });
        }, 0);

        $scope.$watch(function() {
            projectFunctions.getProjectData(projectData);
            pc.projectName = projectData.project.projectName;
            pc.projectId = projectData.project.projectId;
            pc.projectDescription = projectData.project.projectDescription;
            pc.projectManager = projectData.project.projectManager;
            pc.projectManagerName = projectData.project.projectManagerName;
            pc.createDate = projectData.project.createDate;
            pc.updateDate = projectData.project.updateDate;
            pc.vcsLink = projectData.project.vcsLink;
            pc.projectPhase = projectData.project.projectPhase;
            pc.projectProgress = projectData.project.projectProgress;
        });

        pc.increase = 10;
        pc.decrease = -10;
        pc.setTaskProgress = function setTaskProgress(value){
            projectFunctions.setProgressBarValue(value);
        };
    }

    function ProjectFunctions(taskService, $filter){
        var tf = this;

        var projectData;
        tf.getProjectData = function getProjectData(data){
            projectData = data;
        };

        tf.setProgressBarValue = function setProgressBarValue(value){
            if(projectData.task.taskProgress + value <= 100){
                projectData.task.taskProgress += value;
                tf.updateDate();
                taskService.setTask(projectData.task.taskId, projectData.task);
            }
        };

        tf.updateDate = function updateDate(){
            projectData.task.updateDate = $filter('date')(new Date(), 'dd/MM/yyyy  HH:mm');
        }

    }

})(window.angular);