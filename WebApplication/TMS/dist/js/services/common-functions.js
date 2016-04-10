/**
 * Created by Tomasz on 4/5/2016.
 */
(function (ng) {
    'use strict';

    angular.module('commonFunctions', [])
        .service('commonFunctions', CommonFunctions)
        .service('commonListFunctions', CommonListFunctions);

    function CommonFunctions() {
        var cf = this;

        cf.getData = function getData(response) {
            return response.data;
        };

        cf.objectLength = function objectLeangth(object) {
            return Object.keys(object).length;
        }
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