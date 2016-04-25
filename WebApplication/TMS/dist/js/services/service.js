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
    function UserService($http, commonFunctions) {
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

        mts.setTask = function setTask(taskId, taskData) {
            var url = GET_TASK_DATA.replace("{taskId}", taskId);
            $http.post(url, taskData).then(commonFunctions.getData);
        };
    }

    /*PROJECTS LIST SERVICE*/
    function ProjectService($http, commonFunctions) {
        var ps = this;

        var PROJECT_LIST_URL = 'http://localhost:7575/projects';
        var PROJECT_DATA_URL = 'http://localhost:7575/projects/{projectId}.json';

        ps.getProjectList = function getProjectList() {
            return $http.get(PROJECT_LIST_URL).then(function successCallback(response) {
                return commonFunctions.getData(response);

            }, function errorCallback(response) {
                console.error('Service unavailable, returned response:', response);
            });
        };

        ps.getProject = function getProject(projectId) {
            var url = GET_PROJECT_DATA.replace("{projectId}", projectId);
            return $http.get(url).then(function successCallback(response) {
                return commonFunctions.getData(response);

            }, function errorCallback(response) {
                console.error('Service unavailable, returned response:', response);
            });
        };

        ps.postProject = function postProject(projectId) {
            var url = GET_PROJECT_DATA.replace("{projectId}", projectId);
            return $http.post(url, postData).then(function successCallback(response) {

            }, function errorCallback(response) {
                console.error('Service unavailable, returned response:', response);
            });
        };

        ps.putProject = function postProject(projectId) {
            var url = GET_PROJECT_DATA.replace("{projectId}", projectId);
            return $http.put(url, putData).then(function successCallback(response) {

            }, function errorCallback(response) {
                console.error('Service unavailable, returned response:', response);
            });
        };

    }

})(window.angular);