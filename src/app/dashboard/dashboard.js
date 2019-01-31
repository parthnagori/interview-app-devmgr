angular.module('dashboard', ['resources.devices', 'filters.formatting'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'app/dashboard/dashboard.tpl.html',
    controller: 'DashboardCtrl',
    resolve:{
      devices: ['Devices', function (Devices) {
        return Devices.all();
      }],
      highCPU_devices: ['Devices', function (Devices) {
        return Devices.sortByKey('cpuPct'); 
      }]
    }
  });
}])

.controller('DashboardCtrl', ['$scope', '$location', 'devices', 'highCPU_devices', function ($scope, $location, devices, highCPU_devices) {
  $scope.devices = devices;
  $scope.highCPU_devices = highCPU_devices;
}]);