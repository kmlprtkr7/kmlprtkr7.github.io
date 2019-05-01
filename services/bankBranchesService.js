myApp.service('bankBranchesService', ['$http', function ($http) {

    this.getBankBranches = function(city_name) {
        return $http.get('https://vast-shore-74260.herokuapp.com/banks?city='+city_name).then(function (res) {
            return res;
        }).catch(function (error) {
            console.log("error", error);
        });
    }

 }]);