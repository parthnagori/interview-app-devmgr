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


.controller('DashboardCtrl', ['$scope', '$filter', '$location', 'devices', function ($scope, $filter, $location, devices) {
  $scope.devices = devices;
}])

// Custom directive to get devices ordered by the usage column specified in the template
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