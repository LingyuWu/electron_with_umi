# electron_with_umi

简单整合了 umi 与 electron

npm 配置淘宝镜像

``` bash
# .npmrc
registry=https://registry.npm.taobao.org/
electron_mirror=http://npm.taobao.org/mirrors/electron/
```

安装依赖

``` bash
yarn
```

解决 electron 安装的问题

修改文件 ./node_modules/electron/dist/cjs/artifact-utils.js

``` javascript
// 原本
const path = mirrorVar('customDir', opts, details.version);
// 修改为
let path = mirrorVar('customDir', opts, details.version);
path = path.replace("v", "");
```

修改配置

``` javascript
// package.json
"scripts": {
  "start": "umi dev",
  "build": "umi build",
  "estart": "electron .",
  "reinstall": "node ./node_modules/electron/install.js",
  "package": "electron-packager . demo --darwin --arch=x64 --out=release --app-version=1.0.0 --overwrite"
},
```

重新安装electron并测试使用

``` bash
yarn reinstall # 重新安装
yarn start # 调试网页
yarn build # 构建
yarn estart # 调试app
yarn package # 打包应用
```

