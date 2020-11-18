# PrototypeManager

[![npm](https://img.shields.io/npm/v/vue-lowdb.svg)](https://www.npmjs.com/package/vue-lowdb) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> 产品原型压缩版管理

![img](static/image/demo.gif)

## 功能

* 新增分类
* 删除分类
* 编辑分类
* 查询分类
* 新增原型版本
* 删除原型版本
* 编辑原型版本
* 查询原型版本
* 新建管理员账号、菜单权限
* 编辑管理员账号、菜单权限
* 导出数据

![img](static/image/产品原型管理工具.png)

### 【管理员】
![img](./static/image/demo.png)

### 【访客】
![img](./static/image/demo2.png)


## 开发环境

|名称|版本|
|-|-|
|nodejs|v12.13.0|
|vue|v2.5.2|

## 安装
1.下载Nodejs

>http://nodejs.cn/download/

2.安装Nodejs

（1）检查版本
```bash
node -v
```
（2）设置淘宝镜像（提升安装速度）
```bash
npm config set registry http://registry.npm.taobao.org/
```

>如果你已安装Nodejs环境，可跳过1和2步骤

3.安装与使用

（1）服务端

① 打开终端窗口，进入目录/PrototypeManager/server下

```bash
cd /PrototypeManager/server
```
② 执行安装

```bash
cnpm install
```

③启动后端
```bash
nodemon server
```

![img](static/image/back-end-server.png)

（2）前端

①再次打开新的cmd终端窗口，进入目录/PrototypeManager下，执行命令行如下命令：

```bash
cd /PrototypeManager
```

②安装

* 安装cnpm
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

* 安装node-sass
```bash
cnpm install node-sass --save
```
* 安装
```bash
cnpm install
```
③启动前端
```bash
npm run dev
```
![img](static/image/front-end-server.png)

（3）浏览器地址访问
>http://localhost:8088



# 操作手册

## 登录管理员

账号：admin
密码：123456

![img](static/image/login.jpg)

>访客无需登录，仅有查看权限

## 新增原型版本

![img](static/image/add_url.jpg)


## 新增分类

![img](static/image/add_category.jpg)


## 筛选分类

![img](static/image/add_category2.jpg)

## 新增账号

![img](static/image/add_username.jpg)

## 导出数据

![img](static/image/add_output.jpg)

## 注意事项

* 1.产品原型压缩包，暂不支持文件夹嵌套压缩。

例如： 压缩包.zip 解压后根目录就是原型文件内容，而不是还有一层文件夹进去才是原型文件内容。

* 2.压缩包名称和解压后文件夹名称要一致。

## TODO 开发中

* 1.支持rar、tar
* 2.多层级解压


