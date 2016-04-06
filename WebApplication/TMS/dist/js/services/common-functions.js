/**
 * Created by Tomasz on 4/5/2016.
 */
(function (ng) {
    'use strict';

    angular.module('commonFunctions', [])
        .service('commonServiceFunctions', CommonServiceFunctions)
        .service('commonListFunctions', CommonListFunctions);

    function CommonServiceFunctions() {
        var csf = this;

        csf.getData = function getData(response) {
            return response.data;
        };
    }

    function CommonListFunctions() {
        var clf = this;

        clf.setProgress = function setProgress(progress) {
            switch (progress) {
                case 100:
                    return 'progress-bar-success';
                default:
                    return 'progress-bar-info';
            }
        };

        clf.setLabel = function setLabel(label) {
            switch (label) {
                case 'In Progress':
                    return 'label label-primary';
                case 'Completed':
                    return 'label label-success';
                case 'New':
                    return 'label label-info';
                case 'Urgent':
                    return 'label label-danger';
                default:
                    return 'label label-default';
            }
        };
    }

})(window.angular);