/**
 * Created by my on 17/2/21.
 */

import Routes from './routes';

var app = angular.module("common.myLoader", [Routes]);
// app.config(function ($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
//
//     app.controllerProvider = $controllerProvider;
//     app.compileProvider = $compileProvider;
//     app.routeProvider = $routeProvider;
//     app.filterProvider = $filterProvider;
//     app.provide = $provide;
//     console.log(app)
//
//     // Register routes with the $routeProvider
// })
    app.config([
        "$stateProvider",
        "ROUTES",
        function ($stateProvider, ROUTES) {
            console.log(ROUTES);
            var routes = (function () {
                // 定义一个闭包变量用于保存已经加载的路由
                var routes = ["home"];
                return routes;
            })();

            ROUTES.forEach(function (item, index) {
                console.log(item);
                var defaultResolve = {
                    // console.log("This is resolve")
                    loadModule: ["$q", "$timeout", "$rootScope", function ($q, $timeout, $rootScope) {
                        var d = $q.defer();
                        if (routes.indexOf(item.name) != -1) {
                            d.resolve();
                            return d.promise;
                        }
                        loadModules(item.name, $timeout, $q)
                            .then(function () {
                                routes.push(item.name);
                                d.resolve();
                            });

                        return d.promise;

                    }],
                    // 是否开启animateBar
                };
                var resolveObj = item.resolve || {};
                $stateProvider
                    .state(item.state, {
                        url: item.url,
                        controller: item.ctrl,
                        controllerAs: item.ctrlAs,
                        template: item.tmp,

                        resolve: angular.extend({}, resolveObj, defaultResolve)
                    })
            });


            function loadModules(module, $timeout, $q) {
                var defer = $q.defer();
                console.log("load module: " + module)
                var script = document.createElement('script');
                script.src = "" + module + ".bundle.js";

                document.body.appendChild(script);

                script.onload = function () {
                    defer.resolve();
                    $timeout(function () {
                        document.body.removeChild(script);
                        script.onload = null;
                        script = null;
                    }, 10)
                };
                script.onerror = function (err) {
                    defer.reject(err);
                };
                return defer.promise;


            }
        }])
    .config([
        "$injector",
        "$controllerProvider",
        "$compileProvider",
        "$filterProvider",
        "$animateProvider",
        "$provide",
        function ($injector, $controllerProvider, $compileProvider, $filterProvider, $animateProvider, $provide) {

            var
                ng = angular,
                _module,

                providers,
                decorator
                ;

            _module = ng.module;
            ng.module = module;

            providers = {
                $injector: $injector,
                $controllerProvider: $controllerProvider,
                $compileProvider: $compileProvider,
                $filterProvider: $filterProvider,
                $animateProvider: $animateProvider,
                $provide: $provide
            };

            decorator = {
                config: invokeBridge("$injector", "invoke"),
                controller: invokeBridge("$controllerProvider", "register"),
                directive: invokeBridge("$compileProvider", "directive"),
                filter: invokeBridge("$filterProvider", "register"),
                animation: invokeBridge("$animateProvider", "register"),

                provider: invokeBridge("$provide", "provider"),
                decorator: invokeBridge("$provide", "decorator"),
                constant: invokeBridge("$provide", "constant"),
                value: invokeBridge("$provide", "value"),
                factory: invokeBridge("$provide", "factory"),
                service: invokeBridge("$provide", "service")
            };

            function invokeBridge(provider, method) {
                return function () {
                    providers[provider][method].apply(ng, arguments);
                    return decorator;
                }
            }

            function module() {
                console.log('dddddddd=====>>>')

                var
                    ret = _module.apply(ng, arguments)
                    ;

                return ng.extend(ret, decorator);

            }
        }
    ])
    .factory("myLoader", [
        "$q",
        "$timeout",
        function ($q, $timeout) {
            var loader = {
                loadJs: _loadJs,
                loadCss: loadCss
            };

            function loadJs(srcs) {
                var toLoads = [];
                var defer = $q.defer();
                if (typeof srcs == 'string') {
                    srcs = Array.prototype.slice.call([], srcs);
                }
                // srcs = [].prototype.slice.call([], srcs);
                (srcs || []).forEach(function (src) {
                    toLoads.push(_loadJs(src))
                });
                if (!toLoads.length)return;
                Promise.all(toLoads)
                    .then(function (rslt) {
                        defer.resolve(rslt)
                    });
                return defer.promise;
            }

            function _loadJs(src) {
                var defer = $q.defer();
                console.log("load js: " + src)
                var script = document.createElement('script');
                script.src = src;

                document.body.appendChild(script);

                script.onload = function () {
                    defer.resolve();
                    $timeout(function () {
                        // document.body.removeChild(script);
                        script.onload = null;
                        script = null;
                    }, 10)
                };
                script.onerror = function (err) {
                    defer.reject(err);
                };
                return defer.promise;
            }

            function loadCss(href) {
                var defer = $q.defer();
                var css = document.createElement("link");
                link.href = href;

                document.head.appendChild(link);

                link.onload = function () {
                    defer.resolve();
                };
                link.onerror = function () {
                    console.log(src + "加载失败，请检查href是否填写正确");
                    defer.reject();
                };

                return defer.promise;
            }

            return loader;
        }
    ])
;

    export default app.name;