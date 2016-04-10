(function (ng) {
    'use strict';

    function DashboardFunctions($filter, commonFunctions) {
        var df = this;
        //df.taskData = taskData;
        df.calcError = function calcError () {
            return commonFunctions.objectLength($filter('myActiveBug')(taskData, '105'));
        };

        df.countCompletedTasks = function countCompletedTasks() {
            return commonFunctions.objectLength($filter('completedTasks')(taskData));
        };

        var taskData;
        df.getTaskData = function getTaskData(data){
            taskData = data;
        };
    }

    ng.module('dashboard', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'pages/dashboard.html',
                    controller: DashboardController,
                    controllerAs: 'dc',
                    resolve: {
                        userData: function (userService) {
                            return userService.getThisUser();
                        },
                        taskData: function (taskService) {
                            return taskService.getTaskList();
                        }
                    }

                })
        })
        .service('dashboardFunctions', DashboardFunctions);

    function DashboardController(userData, taskData, dashboardFunctions) {
        var dc = this;

        dc.userData = userData.user;
        dc.taskData = taskData;
        dashboardFunctions.getTaskData(dc.taskData);
        dc.calcError = dashboardFunctions.calcError();
        dc.countCompletedTasks = dashboardFunctions.countCompletedTasks();

        dc.setLabel = function (label) {
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

        //-------------
        //- BAR CHART -
        //-------------
        var barChartCanvas = $("#barChart").get(0).getContext("2d");
        var barChart = new Chart(barChartCanvas);
        var barChartData = $.getJSON('dist/data/timesheet.json');
        /*BAR CHART OPTIONS*/
        var barChartOptions = {
            scaleBeginAtZero: true,
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.12)",
            scaleGridLineWidth: 1,
            scaleShowHorizontalLines: true,
            scaleShowVerticalLines: false,
            barShowStroke: true,
            barStrokeWidth: 2,
            barValueSpacing: 5,
            barDatasetSpacing: 1,
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
            showTooltips: true,
            responsive: true,
            maintainAspectRatio: true
        };
        barChartData.done(function (data) {
            barChart.StackedBar(data.timesheet, barChartOptions);
        });
        barChartOptions.datasetFill = false;


        //-------------
        //- PIE CHART -
        //-------------
        var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
        var pieChartCanvas1 = $("#pieChart1").get(0).getContext("2d");
        var pieChart = new Chart(pieChartCanvas);
        var pieChart1 = new Chart(pieChartCanvas1);
        var PieData = $.getJSON('dist/data/project_chart_1.json');
        /*PIE CHART OPTIONS*/
        var pieOptions = {
            segmentShowStroke: true,
            segmentStrokeColor: "#fff",
            segmentStrokeWidth: 1,
            percentageInnerCutout: 50, // This is 0 for Pie charts
            animationSteps: 100,
            animationEasing: "easeOutBounce",
            animateRotate: true,
            animateScale: false,
            responsive: true,
            maintainAspectRatio: false,
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
            tooltipTemplate: "<%=value %> <%=label%> users"
        };
        PieData.done(function (data) {
            pieChart.Doughnut(data.chart1, pieOptions);
            pieChart1.Doughnut(data.chart1, pieOptions);
        });
    }
})(window.angular);
