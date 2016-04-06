/**
 * Created by Tomasz on 4/5/2016.
 */
(function(ng){
    "use strict";

    ng.module('sidebar', [])
        .component('sidebar', {
            templateUrl: './pages/sidebar.html',
            controller: SidebarController,
            controllerAs: 'sbc'
        });

    function SidebarController(){

    }

})(window.angular);