(function(ng){
    "use strict";

    ng.module('tms',
        [
            'ngRoute',
            'myTasks',
            'projects',
            'service',
            'commonFunctions',
            'task',
            'project',
            'customFilter'
        ])
        .config(
            function ($routeProvider) {
                $routeProvider
                    .when('/', {
                        templateUrl: 'pages/dashboard.html',
                        controller: 'DashboardController',
                        controllerAs: 'dc',
                        myCustomName: 'Dashboard'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
            }
        )


})(window.angular);