/**
 * Created by my on 17/2/21.
 */

    import '!style-loader!css-loader!less-loader!./index.less';
    let tmp = require('./index.html');

    var app = angular.module('module.employ', [])

        // .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
        //     $urlRouterProvider.when('/employ', function () {
        //         console.log('This is /main')
        //     })
        // }])
        .controller('employCtrl', function ($scope, $state, $timeout) {
            return new EmployCtrl(...arguments);
        })
        app.directive('ddd', [
            function () {
                return function () {
                    console.log('dd')
                }
            }
        ])

;
    console.log('app------->>>', app)

    class EmployCtrl{
        constructor($scope, $state, $timeout){
            console.log($state);
            // $state.current.template = tmp;
            // $scope.$evalAsync();

            this.moduleName = 'employ';
            $scope.moduleName = this.moduleName;
        }
    }

export default app.name;