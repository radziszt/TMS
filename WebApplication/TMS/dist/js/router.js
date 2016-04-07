(function(ng){
    "use strict";

    ng.module('tms',
        [
            'dashboard',
            'myTasks',
            'task',
            'projects',
            'project',
            'mainComponents',

            'service',
            'commonFunctions',
            'customFilter'
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