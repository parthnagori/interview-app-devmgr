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
}])

.directive('topDevices', function ($filter) {
  return {
    templateUrl: "app/dashboard/top_devices.tpl.html",
    scope: {
      usageColumn: '@usageColumn',
      topDevices: '=',
      columnName: '@columnName' 
    },
    link: function(scope){
      scope.top_devices = $filter('orderBy')(scope.topDevices, '-'+scope.usageColumn);
      scope.device_count = 5;
    }
  }
});