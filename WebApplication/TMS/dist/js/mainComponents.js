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

        setTimeout(function(){
            $('#newTaskModal').appendTo("body");
            $('.select2').select2({
                templateResult: formatState,
                templateSelection: formatState
            });

            function formatState (data) {
                if (!data.id) {
                    return data.text;
                }
                console.log(data);
                var $state = $(
                    '\<span class="label label-success"\>' + data.element.value.toLowerCase() + '\</span\>'
                );
                return $state;
            }

        }, 0);


    }

})(window.angular);