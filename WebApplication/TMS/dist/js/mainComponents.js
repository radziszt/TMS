/**
 * Created by Tomasz on 4/7/2016.
 */
(function (ng) {
    "use strict";

    ng.module('mainComponents', [])
        .component('navBar', {
            templateUrl: 'pages/components/navBar.html',
            controller: NavBarController,
            controllerAs: 'nbc',
            bindings: {
                userData: '='
            }

        })
        .component('statusLabel', {
            templateUrl: 'pages/components/statusLabel.html',
            binding: {
                label: '='
            },
            controller: StatusLabelController,
            controllerAs: 'slc'
        });

    function StatusLabelController() {

    }

    function NavBarController($scope, projectService) {
        var nbc = this;

        console.log('NBC', nbc.userData);

        projectService.getProjectList().then(function(data){
             nbc.projectList = data;
        });
        nbc.reapeatSelect = null;

        setTimeout(function () {

            $('#newTaskModal').appendTo("body");

            $("#dueDate").inputmask("dd/mm/yyyy", {"placeholder": "dd/MM/yyyy"});

            $('#taskStatus').select2({
                templateResult: labelType,
                templateSelection: labelType,
                placeholder: 'Task Status',
                minimumResultsForSearch: Infinity
            });

            $('#taskPriority').select2({
                templateResult: labelType,
                templateSelection: labelType,
                placeholder: 'Task Priority',
                minimumResultsForSearch: Infinity
            });
            $('#taskType').select2({
                templateResult: iconType,
                templateSelection: iconType,
                placeholder: 'Task Priority',
                minimumResultsForSearch: Infinity
            });

            $('#project').select2({
                placeholder: 'Project',
                minimumResultsForSearch: Infinity
            });

            function labelType(data) {
                if (!data.id) {
                    return data.text;
                }

                var htmlTemplate;

                switch (data.element.value) {
                    case 'In Progress':
                        htmlTemplate = 'label-info';
                        break;
                    case 'Normal':
                        htmlTemplate = 'label-info';
                        break;
                    case 'Completed':
                        htmlTemplate = 'label-success';
                        break;
                    case 'Fixed':
                        htmlTemplate = 'label-success';
                        break;
                    case 'New':
                        htmlTemplate = 'label-warning';
                        break;
                    case 'High':
                        htmlTemplate = 'label-warning';
                        break;
                    case 'Urgent':
                        htmlTemplate = 'label-danger';
                        break;
                    case 'Blocker':
                        htmlTemplate = 'label-danger';
                        break;
                    case 'Low':
                        htmlTemplate = 'label-default';
                        break;
                    default:
                        break;
                }

                var $state = $(
                    '\<span class="label ' + htmlTemplate + '"\>' + data.element.value + '\</span\>'
                );
                return $state;
            }
            function iconType(data) {
                if (!data.id) {
                    return data.text;
                }

                var htmlTemplate;

                switch (data.element.value) {
                    case 'Bug':
                        htmlTemplate = 'fa-bug';
                        break;
                    case 'Development':
                        htmlTemplate = 'fa-code';
                        break;
                    case 'Graphics':
                        htmlTemplate = 'fa-paint-brush';
                        break;
                    case 'Documentation':
                        htmlTemplate = 'fa-file-text-o';
                        break;
                    case 'Architecture':
                        htmlTemplate = 'fa-cubes';
                        break;
                }

                var $state = $(
                    '\<span>\<i class="fa ' + htmlTemplate + '"\>\</i> ' + data.element.value + '\</span\>'
                );
                return $state;
            }


        }, 0);


    }

})(window.angular);