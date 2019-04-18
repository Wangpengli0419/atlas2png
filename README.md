# atlas2png
本工具可以将layaAir中的.atlas图集及Egret中的.json图集切割为散图，且不修改散图的名称

> 请先下载本项目到本地，并且安装[GraphicsMagick] (http://www.graphicsmagick.org/)
> 
> 然后安装node模块 [gm](https://www.npmjs.com/package/gm)
>
```javascript
	npm install gm -g
```
>
> 将要转换的egret.png及egret.json文件放置在json文件夹中 
>
> 将要转换的laya.png及laya.atlas文件放置在atlas文件夹中 
>
> ## 注意： 转换完成后将会生成命名以图集名称的文件夹，解析的散图以自己的名称放置在其中 
>
> 如需将egret图集转换为散图，请在文件夹根目录使用命令


```javascript
	npm run json2png egret
```
>
> 如需将laya图集转换为散图，请在文件夹根目录使用命令
>
```javascript
	npm run atlas2png laya
```
