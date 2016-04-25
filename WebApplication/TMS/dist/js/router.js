(function(ng){
    "use strict";

    ng.module('tms',
        [
            'login',
            'dashboard',
            'myTasks',
            'task',
            'projects',
            'project',
            'mainComponents',

            'service',
            'commonFunctions',
            'customFilter',
            'ngRoute'
        ])
        .config(
            function ($routeProvider) {
                $routeProvider
                    .otherwise({
                        redirectTo: '/'
                    });
            }
        )
})(window.angular);