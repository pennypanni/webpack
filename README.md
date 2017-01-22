###安装
*安装Node.js<br>
Node.js 自带了软件包管理器 npm。首先用`npm -v`查看是否安装了Node.js。没有的话，先从网上下载并安装。[https://nodejs.org/en/download/](https://nodejs.org/en/download/)<br>
点击开始--运行--cmd，输入`node --version`可以检查Node.js版本。<br>
*安装package.json<br>
`
$ npm init #生成package.json文件
`
*安装webpack<br>
**全局安装**<br>
`
$ npm install webpack -g
`
**本地安装**<br>
`
$ npm install webpack --save-dev
`<br>
`--save` 通过这个参数，将保存配置信息至package.json（package.json是node.js项目配置文件）
`--save-dev` 保存至package.json的devDependencies属性，不指定-dev将保存至dependencies属性。（dependencies字段指定了项目运行所依赖的模块，devDependencies指定项目开发所需要的模块。）
*安装指定版本*，命令如下：
`
$ npm install webpack@2.2.0-rc.3
`
