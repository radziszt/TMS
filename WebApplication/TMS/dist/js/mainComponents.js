/**
 * Created by Tomasz on 4/7/2016.
 */
(function(ng){
    "use strict";

    ng.module('mainComponents', [])
        .component('navBar', {
            templateUrl: 'pages/components/navBar.html',
            controller: NavBarController,
            controllerAs: 'nbc'
        });

    function NavBarController(){

        $('#newTaskModal').appendTo("body");
    }

})(window.angular);