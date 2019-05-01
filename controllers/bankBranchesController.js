myApp.controller('bankBranchesController', ['bankBranchesService', '$scope', function(bankBranchesService, $scope) {	
	
    let self = this;
    self.cities = ['Bangalore', 'Mumbai', 'Pune', 'Delhi', 'Chandigarh'];
    
    // Change Method on Select Box and Hit API with selected value
    self.loadCityBranches = function() {
        $scope.searchText = '';
        let city_name = this.selectedCity.toUpperCase();
        bankBranchesService.getBankBranches(city_name)
        .then(function(res){
            populateTable(res.data);
        })
        .catch(function(err){
            console.log("There is an error");
        })
    }
    
    // Fetching Table Heading/Keys from API response
    function populateTable(data) {
        self.branchDataArr = data;
        self.branchHeadingArr = [];
        self.branchHeadingArr.push('Sr.No.');
        angular.forEach(data[0], function(branch, b_key) {
            self.branchHeadingArr.push(b_key);
        });
    }
	
}]);