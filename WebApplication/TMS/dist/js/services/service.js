/**
 * Created by Tomasz on 4/5/2016.
 */
(function (ng) {
    'use strict';

    angular.module('service', [])
        .service('taskService', TaskService)
        .service('projectService', ProjectService)
        .service('userService', UserService);

    /*USER SERVICE*/
    function UserService($http, commonFunctions){
        var us = this;

        us.thisUser = 105;

        var GET_USER_DATA = 'dist/data/{userId}.json';
        us.getUser = function getUser(userId) {
            var url = GET_USER_DATA.replace("{userId}", userId);
            return $http.get(url).then(commonFunctions.getData);
        };

        us.getThisUser = function getThisUser() {
            var url = GET_USER_DATA.replace("{userId}", us.thisUser);
            return $http.get(url).then(commonFunctions.getData);
        };

    }

    /*MY TASKS LIST SERVICE*/
    function TaskService($http, commonFunctions) {
        var mts = this;

        var GET_TASK_LIST = 'dist/data/tasks.json';
        var taskListData = $http.get(GET_TASK_LIST).then(commonFunctions.getData);
        mts.getTaskList = function getTaskList() {
            return taskListData;
        };

        var GET_TASK_DATA = 'dist/data/{taskId}.json';
        mts.getTask = function getTask(taskId) {
            var url = GET_TASK_DATA.replace("{taskId}", taskId);
            return $http.get(url).then(commonFunctions.getData);
        };

        mts.setTask = function setTask(taskId, taskData){
            var url = GET_TASK_DATA.replace("{taskId}", taskId);
            $http.post(url, taskData).then(commonFunctions.getData);
        };
    }

    /*PROJECTS LIST SERVICE*/
    function ProjectService($http, commonFunctions) {
        var ps = this;

        var GET_PojectList = 'dist/data/projects.json';
        var projectData = $http.get(GET_PojectList).then(commonFunctions.getData);

        var GET_PROJECT_DATA = 'dist/data/{projectId}.json';
        ps.getProject = function getProject(projectId) {
            var url = GET_PROJECT_DATA.replace("{projectId}", projectId);
            return $http.get(url).then(commonFunctions.getData);
        };

        ps.getProjectList = function getProjectList() {
            console.log(projectData);
            return projectData;
        }
    }

})(window.angular);