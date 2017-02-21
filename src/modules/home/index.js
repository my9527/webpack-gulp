/**
 * Created by my on 17/2/21.
 */

import '!style-loader!css-loader!less-loader!./home.less'

var app = angular
    .module('module.home', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('main.home', {
                url: '/home',
                controller: 'homeCtrl',
                template: require('./home.html')
            })
    }])
    .controller('homeCtrl', function ($scope) {
        return new HomeCtrl(...arguments);
    })

;
console.log(app, 'home');
export default app.name;
    class HomeCtrl{
        constructor($scope){
            $scope.txt = 'This is module Home';
        }
    }