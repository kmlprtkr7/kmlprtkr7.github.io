var myApp = angular.module('myApp', []);

// Custom interceptor factoring
myApp.factory('httpLoadingInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
    // Request iteration counter - count requests started
    var reqIteration = 0;
    return {
        request: function (config) {
            // Firing event only if current request was the first
            if(reqIteration === 0){
          		$rootScope.$broadcast('globalLoadingStart');
            }
            // Increasing request iteration
            reqIteration++;
            return config || $q.when(config);
        },
        response : function(config){
          // Decreasing request iteration
          reqIteration--;
          // Firing event only if current response was came to the last request
          if(!reqIteration){
          	$rootScope.$broadcast('globalLoadingEnd');
          }
          return config || $q.when(config);
        }
    };
}])

// Injecting our custom loader interceptor
myApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpLoadingInterceptor');
}])

// Directive for loading
myApp.directive('spinnerLoader', function(){
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="spinnerLoad largeSize">' +
        '<div id="stepOne"    class="bar"></div>' +
        '<div id="stepTwo"    class="bar"></div>' +
        '<div id="stepThree"  class="bar"></div>' +
        '<div id="stepFour"   class="bar"></div>' +
        '<div id="stepFive"   class="bar"></div>' +
        '<div id="stepSix"    class="bar"></div>' +
        '<div id="stepSeven"  class="bar"></div>' +
        '<div id="stepEight"  class="bar"></div>' +
        '<div id="stepNine"   class="bar"></div>' +
        '<div id="stepTen"    class="bar"></div>' +
        '<div id="stepEleven" class="bar"></div>' +
        '<div id="stepTvelve" class="bar"></div>' +
    '</div>',
    link:function(scope,element){
      
      // Applying base class to the element
      angular.element(element).addClass('ng-hide');
      
      // Listening to 'globalLoadingStart' event fired by interceptor on request sending
      scope.$on('globalLoadingStart',function(){
        angular.element(element).toggleClass('ng-show ng-hide');
      });
      
      // Listening to 'globalLoadingEnd' event fired by interceptor on response receiving
      scope.$on('globalLoadingEnd',function(){
        angular.element(element).toggleClass('ng-hide ng-show');
      });
    }
  }
})
