/**
 * Created by my on 2016/10/18.
 */
// 路由定义，可由后台返回
export default angular
    .module("common.routes", [])
    .constant("ROUTES", [
        {
            url: "/employ",
            name: "employ",
            tmp: require('../modules/employ/index.html'),
            // tmp: '../modules/employ/index.html',
            ctrl: "employCtrl",
            ctrlAs: "ec",
            icon: "my-icon-edit",
            state: 'main.employ'
        }
    ])
    .value("LoadedModules", [])
    .name
;