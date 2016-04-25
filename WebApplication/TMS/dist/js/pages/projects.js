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
                            return projectService.getProjectList();
                        },
                        userData: function (userService) {
                            return userService.getThisUser();
                        }
                    }
                });
        });

    function ProjectsController(projectList, userData, $sce){
        var pc = this;

        pc.userData = userData.user;
        pc.projectList = projectList.projects;

        pc.setGoLiveHtml = function setGoLiveHtml(goLive){
            switch(goLive){
                case 'Live':
                    var insertHtml = '\<span class="label label-success"\>' + goLive + '\</span\>';
                    return $sce.trustAsHtml(insertHtml);
                default:
                    return $sce.trustAsHtml(goLive);
            }
        };

        setTimeout(function(){
            $('#projectList').DataTable({
                pageLength: 25
            });
        }, 0);

    }

})(window.angular);