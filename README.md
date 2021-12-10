# 代码使用方法

```
yarn global add parcel 或者 npm i -g parcel
parcel src/index.html

```
#代码部署方法：
git add 之前执行下面这段代码
```
parcel build src/index.html --no-minify --public-url .
```