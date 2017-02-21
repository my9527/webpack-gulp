/**
 * Created by my on 17/2/21.
 */
import angular from 'angular';
window.angular  = angular;

import AngularUIRoute from 'angular-ui-router';

import pHome from '../modules/home/index';
import Utils from '../utils/index';
// import pEmploy from '../modules/employ/index';

angular
    .module('myApp', [
        AngularUIRoute,
        Utils,
        pHome
        // pEmploy
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/main',
                controller:'MainCtrl',
                // abstract: true,
                template: '<div ui-view></div>'
            })
    }])
    .controller('MainCtrl', [
        '$location',
        '$state',
        function ($location, $state) {
            console.log('Hello Angular')
            $state.go('main.home');
        }
    ])
;
    