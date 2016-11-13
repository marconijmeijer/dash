
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.custom')
        .controller('customController', customController);

    customController.$inject = ['$log','webSockets'];    
    function customController($log,webSockets) {
        // for controllerAs syntax
        var vm = this;


        activate();

        ////////////////

        function activate() {

            $log.log('I\'m a line from custom.js');
            vm.gaugeValue = 0;

            var items = [];

            webSockets.subscribe(function (item) {
                items.push(item);

                if (items.length > 40) {
                    items.shift();
                }

                vm.chart = {
                    data: items,
                    max: 30
                };

                vm.gaugeValue = item.value;
                //$scope.$apply();
            });        
        }
    }
})();
