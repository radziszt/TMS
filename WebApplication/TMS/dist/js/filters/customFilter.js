/**
 * Created by Tomasz on 4/6/2016.
 */
(function (ng) {
    'use strict';

    ng.module('customFilter', [])
        .filter('myNotCompleted', myNotCompleted)
        .filter('myCompleted', myCompleted)
        .filter('newOrUrgent', newOrUrgent)
        .filter('myActiveBug', myActiveBug);

    function myActiveBug() {
        return function (items, userId) {
            var filtered = [];
            ng.forEach(items, function (item) {
                if ((item.taskStatus !== 'Completed' &&
                    item.taskStatus !== 'Fixed' &&
                    item.taskStatus !== 'Closed') &&
                    item.taskAssignee === userId &&
                    item.type === 'Bug') {
                    filtered.push(item);
                    console.log('OMG', filtered);
                }
            });
            return filtered;
        }
    }

    function newOrUrgent() {
        return function (items) {
            var filtered = [];
            ng.forEach(items, function (item) {
              if (item.taskStatus == 'New' || item.taskStatus === 'Urgent'){
                  filtered.push(item);
              }
            });
            return filtered;
        }
    }

    function myNotCompleted() {
        return function (items, userName) {
            var filtered = [];
            ng.forEach(items, function (item) {
                if ((item.taskStatus !== 'Completed' &&
                    item.taskStatus !== 'Fixed' &&
                    item.taskStatus !== 'Closed') &&
                    (item.taskAssignee === userName ||
                    item.taskReporter === userName)) {
                    filtered.push(item);
                }
            });
            return filtered;
        }
    }

    function myCompleted() {
        return function (items, userName) {
            var filtered = [];
            ng.forEach(items, function (item) {
                if ((item.taskStatus === 'Completed' ||
                    item.taskStatus === 'Fixed' ||
                    item.taskStatus === 'Closed') &&
                    (item.taskAssignee == userName ||
                    item.taskReporter == userName)) {
                    filtered.push(item);
                }
            });
            return filtered;
        }
    }


})(window.angular);