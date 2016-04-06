/**
 * Created by Tomasz on 4/5/2016.
 */
(function (ng) {
    'use strict';

    angular.module('service', [])
        .service('taskService', TaskService)
        .service('projectService', ProjectService);

    /*MY TASKS LIST SERVICE*/
    function TaskService($http, commonServiceFunctions) {
        var mts = this;

        var GET_TASK_LIST = 'dist/data/tasks.json';
        var taskListData = $http.get(GET_TASK_LIST).then(commonServiceFunctions.getData);
        mts.getTaskList = function getTaskList() {
            return taskListData;
        };

        var GET_TASK_DATA = 'dist/data/{taskId}.json';
        mts.getTask = function getTask(taskId) {
            var url = GET_TASK_DATA.replace("{taskId}", taskId);
            return $http.get(url).then(commonServiceFunctions.getData);
        };

        mts.setTask = function setTask(taskId, taskData){
            var url = GET_TASK_DATA.replace("{taskId}", taskId);
            $http.post(url, taskData).then(commonServiceFunctions.getData);
        };
    }

    /*PROJECTS LIST SERVICE*/
    function ProjectService($http, commonServiceFunctions) {
        var ps = this;

        var GET_PojectList = 'dist/data/projects.json';
        var projectData = $http.get(GET_PojectList).then(commonServiceFunctions.getData);

        var GET_PROJECT_DATA = 'dist/data/{projectId}.json';
        ps.getProject = function getProject(projectId) {
            var url = GET_PROJECT_DATA.replace("{projectId}", projectId);
            return $http.get(url).then(commonServiceFunctions.getData);
        };

        ps.getProjectList = function getProjectList() {
            return projectData;
        }
    }

})(window.angular);