angular.module('dashboard', ['resources.devices', 'filters.formatting'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'app/dashboard/dashboard.tpl.html',
    controller: 'DashboardCtrl',
    resolve:{
      devices: ['Devices', function (Devices) {
        return Devices.all();
      }],
    }
  });
}])

// Top 5 devices by highest usage statistics added to scope
.controller('DashboardCtrl', ['$scope', '$filter', '$location', 'devices', function ($scope, $filter, $location, devices) {
  $scope.devices = devices;
  $scope.highCPU_devices = $filter('orderBy')($scope.devices, '-cpuPct').slice(0,5);
  $scope.highMEM_devices = $filter('orderBy')($scope.devices, '-memBytes').slice(0,5);
  $scope.highRX_devices = $filter('orderBy')($scope.devices, '-networkRxBytes').slice(0,5);
  $scope.highTX_devices = $filter('orderBy')($scope.devices, '-networkTxBytes').slice(0,5);
}]);