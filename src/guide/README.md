## 介绍

链联金服是基于恒星网络的去中心化钱包，支持安卓、IOS、桌面平台。

链联金服的DApp支持第三方webapp应用，开发者可以开发自己的DApp，部署到服务器上后，在萤火平台注册并发布应用到链联金服上，供其他用户使用。

链联金服的DApp主要是采用webview技术展现，在钱包提供相应的JS Bridge，从而为DApp提供与钱包交互的功能，包括：获取钱包版本、当前用户公钥、发起支付等功能。


## 快速上手

### 新建example.html

```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>FireFly Demo</title>
  </head>
  <body>
    <button id="btn" onclick="btnClick()">button</button>
    <script>
      /**代码见下一步*/
    </script>
  </body>
</html>
```

### 根据按钮添加点击事件`btnClick`
```
function btnClick(){
  alert('当前用户的公钥：'+window.FFW.address);
}
```

### 将example.html部署到服务器(nginx等)，获取访问地址

### 打开链联金服-探索页面，添加example.html的访问地址，即可点击图标打开该DApp了

### Enjoy!
