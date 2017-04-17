/**
 * Created by millsky on 4/11/17.
 */

angular.module('mathInput',[])
    .controller('mathInputController',['$scope',function($scope){
        $scope.result = "";
        $scope.hasErrors = false;
        /* OUR MODEL Prop */
        $scope.userInput = "";
        $scope.evaluateInput = function () {
            $scope.result = mathParser($scope.userInput);
            if($scope.result == false){
                $scope.hasErrors = true;
            }else{
                $scope.hasErrors = false;
            }
        };

    }])
    .directive('mathInput',function () {
        return {
            restrict:'AE',
            replace: 'true',
            templateUrl: './js/ng/templates/mathInput.html'
        }
    });