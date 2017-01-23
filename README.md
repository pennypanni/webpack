##安装
###安装Node.js<br>
Node.js 自带了软件包管理器 npm。首先用`npm -v`查看是否安装了Node.js。没有的话，先从网上下载并安装。[https://nodejs.org/en/download/](https://nodejs.org/en/download/)<br>
点击开始--运行--cmd，输入`node --version`可以检查Node.js版本。<br>
###安装package.json<br>
`
$ npm init #生成package.json文件
`
###安装webpack
####全局安装
`
$ npm install webpack -g
`
####本地安装
`
$ npm install webpack --save-dev
`<br>
`--save` 通过这个参数，将保存配置信息至package.json（package.json是node.js项目配置文件）<br>
`--save-dev` 保存至package.json的devDependencies属性，不指定-dev将保存至dependencies属性。（dependencies字段指定了项目运行所依赖的模块，devDependencies指定项目开发所需要的模块。）<br>
**安装指定版本**，命令如下：<br>
`
$ npm install webpack@2.2.0-rc.3
`<br>
<br>
webpack简单点来说就是一个配置文件，这个配置文件主要分为三大块:<br>
-*entry* 入口文件 让webpack用哪个文件作为项目的入口<br>
-*output* 出口 让webpack把处理完成的文件放在哪里<br>
-*module* 模块 要用什么不同的模块来处理各种类型的文件<br>
##demo01
index.html<br>
`
<!DOCTYPE html>
<html>
<head>
    <title>webpack demo01</title>
</head>
<body>
    <script type="text/javascript" src="bundle.js"></script>
</body>
</html>
`
main.js<br>
`
document.write('<h1>hello world</h1>');
`
webpack.config.js<br>
`
module.exports = {
    entry: './main.js',
    output:{
        filename: 'bundle.js'
    }
};
`<br>
3个文件放到demo01文件夹中后，点击index.html没有任何内容出现<br>
###运行命令
`
$ webpack
//文件夹中生成bundle.js文件
$webpack-dev-server
//点击index.html,可在浏览器中看到"hello world"
`

