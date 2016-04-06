/**
 * Created by Tomasz on 4/5/2016.
 */
(function (ng) {
    'use strict';

    ng.module('projects', ['ngSanitize'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/projects', {
                    templateUrl: 'pages/projects.html',
                    controller: ProjectsController,
                    controllerAs: 'pc',
                    resolve: {
                        projectList: function(projectService){
                            return projectService.getProjectList()
                        }
                    }
                });
        });

    function ProjectsController(projectList, commonListFunctions, $sce){
        var pc = this;

        pc.projectList = projectList;

        pc.setProgress = function(progress){
            return commonListFunctions.setProgress(progress);
        };

        pc.setLabel = function(label){
            return commonListFunctions.setLabel(label);
        };

        pc.setGoLiveHtml = function setGoLiveHtml(goLive){
            switch(goLive){
                case 'Live':
                    var insertHtml = '\<span class="label label-success"\>' + goLive + '\</span\>';
                    return $sce.trustAsHtml(insertHtml);
                default:
                    return $sce.trustAsHtml(goLive);
            }
        }

        setTimeout(function(){
            $('#projectList').DataTable({
                pageLength: 25
            });
        }, 0);

    }

})(window.angular);