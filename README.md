## 安装
### 安装Node.js
Node.js 自带了软件包管理器 npm。首先用`npm -v`查看是否安装了Node.js。没有的话，先从网上下载并安装。[https://nodejs.org/en/download/](https://nodejs.org/en/download/)<br>
点击开始--运行--cmd，输入`node --version`可以检查Node.js版本。<br>
### 安装package.json<br>
```bash
$ npm init      #生成package.json文件
```
### 安装webpack
#### 全局安装
```bash
$ npm install webpack -g
```
#### 本地安装
```bash
$ npm install webpack --save-dev
```

`--save` 通过这个参数，将保存配置信息至package.json（package.json是node.js项目配置文件）<br>
`--save-dev` 保存至package.json的devDependencies属性，不指定-dev将保存至dependencies属性。<br>
（dependencies字段指定了项目运行所依赖的模块，devDependencies指定项目开发所需要的模块。）

**安装指定版本**，命令如下：

```bash
$ npm install webpack@2.2.0-rc.3
```

webpack简单点来说就是一个配置文件，这个配置文件主要分为三大块:

- `entry` 入口文件 让webpack用哪个文件作为项目的入口
- `output` 出口 让webpack把处理完成的文件放在哪里
- `module` 模块 要用什么不同的模块来处理各种类型的文件

## demo01
index.html

```html
<html>
	<head>
	    <title>webpack demo01</title>
	</head>
	<body>
	    <script type="text/javascript" src="bundle.js"></script>
	</body>
</html>
```

main.js

```javascript
document.write('<h1>hello world</h1>');
```

webpack.config.js

```javascript
module.exports = {
    entry: './main.js',
    output:{
        filename: 'bundle.js'
    }
};
```

3个文件放到[demo01](./demo01)文件夹中后，点击index.html没有任何内容出现
### 运行命令

```bash
$ webpack
//文件夹中生成bundle.js文件,点击index.html,可在浏览器中看到"hello world"

或

$ webpack-dev-server
//可以使用 http://localhost:8080 来预览
```

## 功能介绍
### Loaders
通过使用不同的loader，webpack通过调用外部的脚本或工具可以对各种各样的格式的文件进行处理，比如说分析JSON文件并把它转换为JavaScript文件，或者说把下一代的JS文件（ES6，ES7)转换为现代浏览器可以识别的JS文件。或者说对React的开发而言，合适的Loaders可以把React的JSX文件转换为JS文件。[http://webpackdoc.com/loader.html](http://webpackdoc.com/loader.html)

Loaders需要单独安装并且需要在webpack.config.js下的modules关键字下进行配置，Loaders的配置选项包括以下几方面：
* test：一个匹配loaders所处理的文件的拓展名的正则表达式（必须）
* loader：loader的名称（必须）
* include/exclude：手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
* query：为loaders提供额外的设置选项（可选）

### Babel
Babel是一个编译JavaScript的平台，它的作用：
* 下一代的JavaScript标准（ES6，ES7），这些标准目前并未被当前的浏览器完全的支持；
* 使用基于JavaScript进行了拓展的语言，比如React的JSX

Babel其实是几个模块化的包，其核心功能位于称为babel-core的npm包中，不过webpack把它们整合在一起使用，但是对于每一个你需要的功能或拓展，你都需要安装单独的包（用得最多的是解析Es6的babel-preset-es2015包和解析JSX的babel-preset-react包）。

[demo02](./demo02)

index.html

```html
<html>
	<head>
	    <title>webpack demo02 Babel</title>
	</head>
	<body>
	    <div id="wrapper"></div>
	    <script type="text/javascript" src="bundle.js"></script>
	</body>
</html>
```

main.`jsx`

```javascript
const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.querySelector('#wrapper')     //将h1标题插入#wrapper节点
);
```

webpack.config.js

```javascript
module.exports = {    
    entry: './main.jsx',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',    //.jsx文件使用babel处理
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]   
    }
};
```
需安装多个依赖包：
```
npm install --save babel-core babel-loader babel-preset-es2015 babel-preset-react react react-dom
```

### CSS加载
webpack提供两个工具处理样式表，css-loader 和 style-loader，二者处理的任务不同，css-loader使你能够使用类似@import和 url(...)的方法实现 require()的功能,style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。

[demo03](./demo03)

main.js

```javascript
require('./app.css');
```

app.css

```css
body{
	background-color: blue;
	color:yellow;
	text-align: center;
	font-size:100px;
};
```

index.html

```html
<html>
	<head>
		<script type="text/javascript" src="bundle.js"></script>
	</head>
	<body>
		<h1>Hello World</h1>
	</body>
</html>
```

webpack.config.js

```javascript
module.exports = {
    entry: './main.js',
    output: {
      filename: 'bundle.js'
    },
    module: {
      loaders:[
        { test: /\.css$/, loader: 'style-loader!css-loader' },
      ]
    }
};
```

安装依赖：

```
npm install --save css-loader style-loader
```

运行webpack,打开index.html页面，可以看到style-loader将css样式以嵌入式插入页面，见下图：  

![嵌入式样式](demo03/qianrushi.png)

### 图片加载
见[demo04](demo04)

index.html

```html
<html>
	<body>
		<script type="text/javascript" src="bundle.js"></script>
	</body>
</html>
```
main.js

```javascript
var img1= document.createElement("img");
img1.src=require("./small.jpeg");
document.body.appendChild("img1");

var img2= document.createElement("img");
img2.src=require("./big.jpg");
document.body.appendChild("img2");
```

webpack.config.js

```javascript
module.exports = {
	entry: './main.js',
	output: {
		filename: 'bundle.js'
	},
	module:{
		loaders:[
			{ test:/\.(jpeg|jpg)$/,loader:'url-loader?limit=8192' }
		]
	}
};
```
安装依赖`url-loader`和`file-loader`：
```
npm install url-loader file-loader --save
```
`'url-loader?limit=8192'`表示：当图片小于8192bytes即8KB时，会将图片生成为`data:image/png;base64,`base64图片。<br>
demo04中，原本有small.png和big.jpg两张图片，运行webpack后，big.jpg生成了`1da144414b9e1758b5d0139275a868bc.jpg`。

打开index.html，可以看到两张图片不同的加载方式。
![图片的两种加载方式](demo04/twomethodjietu.png)

### CSS组件加载
[CSS Modules用法教程参考](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)

CSS的规则都是全局的，任何一个组件的样式规则，都对整个页面有效。

产生局部作用域的唯一方法，就是使用一个独一无二的`class`的名字，不会与其他选择器重名。这就是 CSS Modules 的做法。

CSS Modules 允许使用`:global(.className)`的语法，声明一个全局规则。凡是这样声明的class，都不会被编译成哈希字符串。

[demo05](./demo05)

app.css

```css
.h1 {color:red; }      /*局部，style.h1被编译成一个哈希字符串，成为一个独一无二的class名字*/
:global(.h2) {color: blue; }      /*全局*/
```

index.html

```html
<html>
	<body>
	    <div id="example"></div>
	    <script src="./bundle.js"></script>
	</body>
</html>
```

main.jsx

```
var React = require('react');
var ReactDOM = require('react-dom');
var style = require('./app.css');
ReactDOM.render(
  <div>
    <h1 className={style.h1}>Hello World</h1>
    <h2 className="h2">Hello Webpack</h2>
  </div>,
  document.getElementById('example')
);
```

webpack.config.js

```javascript
module.exports={
	entry:'./main.jsx',
	output: {
		filename:'bundle.js'
	},
	module:{
		loaders:[
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015','react']
				}
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader?modules'
			}	
		]
	}
}
```
上面代码中，`style-loader!css-loader?modules`，它在`css-loader`后面加了一个查询参数`modules`，表示打开CSS Modules 功能。

### UglifyJs插件
Loaders和Plugins常常被弄混，但是他们其实是完全不同的东西，可以这么来说，loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个，插件并不直接操作单个文件，它直接对整个构建过程其作用。

Webpack有很多内置插件，同时也有很多第三方插件，可以让我们完成更加丰富的功能。

`UglifyJsPlugin是内置插件，用来压缩JS代码。`[demo06](./demo06)

index.html

```html
<html>
	<body>
	  <script src="bundle.js"></script>
	</body>
</html>
```

main.js

```javascript
var longVariableName = 'Hello';
longVariableName += ' World';
document.write('<h1>' + longVariableName + '</h1>');
```

webpack.config.js

```javascript
var webpack=require('webpack')
module.exports={
	entry:'./main.js',
	output:{
		filename:'bundle.js'
	},
	plugins:[
		new webpack.optimize.UglifyJsPlugin({
			compress:{
				warnings:false
			}
		})
	]
};
```
运行后，UglifyJsPlugin将`main.js`输出压缩版本的`bundle.js`。