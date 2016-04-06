/**
 * Created by Tomasz on 4/5/2016.
 */
(function (ng) {
    'use strict';

    ng.module('myTasks', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/mytasks', {
                    templateUrl: 'pages/mytasks.html',
                    controller: MyTasksController,
                    controllerAs: 'mtc',
                    resolve: {
                        taskList: function (taskService) {
                            return taskService.getTaskList();
                        }
                    }
                });
        });

    function MyTasksController(taskList, commonListFunctions) {
        var mtc = this;

        mtc.taskList = taskList;

        setTimeout(function(){
            $('#ongoingTaskList').DataTable({
                lengthChange: false,
                searching: false
            });
            $('#pastTaskList').DataTable({
                pageLength: 25
            });
        }, 0);

        mtc.setProgress = function(progress){
            return commonListFunctions.setProgress(progress);
        };

        mtc.setLabel = function(label){
            return commonListFunctions.setLabel(label);
        };

    }
})(window.angular);