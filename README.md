# webpack-gulp
使用webpack ＋ gulp 构建 angular 项目


### 需求来源
 webpack 构建项目不够足够灵活，在实现angular 的模块按需加载中无法灵活的获取到相应的模块，故此采用 gulp 来共同构建
###分析
* webpack 本身支持多个入口，故将每个模块的相关文件生成一个js文件，用于动态加载
* 使用gulp 获取模块，动态编写 webpack.config.js 文件，然后启动 webpack-dev-server 或进行打包

###问题
`在实现路由注册时，由于需要指定模块(template/templateUrl), 有两种解决方案，方案一使用 webpack 的require 将 模板文件打入js 文件中，方案二则是使用templateUrl 来指定相应的模版文件`
```javascript
// utils/route.js
{
            url: "/employ",
            name: "employ",
            tmp: require('../modules/employ/index.html'),// 将模板打入js
            // tmp: '../modules/employ/index.html',  // 指定模板文件
            ctrl: "employCtrl",
            ctrlAs: "ec",
            icon: "my-icon-edit",
            state: 'main.employ'
        }
```

考虑到实际开发中对模板文件的修改，如果采用方案二，则需开启两个进程（一个是webpack, 另一个用于监听模版文件的修改）,而方案一则只需一个进程，且较之重写构建之前的开发流程上的差异较小，目前暂定使用方案一
