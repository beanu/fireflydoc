## 示例

下面的连接，需要在钱包中打开。
URL为https://t.cn/Re3xw6q
添加方法：打开链联金服APP中的『探索』，点击右上角的图标，再次点击加号，输入名称，添加上述地址即可。返回『探索』页面，点击打开。
源码见[这里](https://github.com/fchainio/firefly-examples/tree/master/dapp)

如果你的项目是基于`nodejs`的，可以安装官方类库[fireflywallet-api](https://github.com/fchainio/fireflywallet-api)，参考示例项目[firefly-examples中的vue项目示例](https://github.com/fchainio/firefly-examples/tree/master/dapp/vue_demo)。

页面在链联金服中打开后，链联金服会注入FFW对象，可以使用window.FFW访问。可以根据此判断网页是否是在萤火内开启。

## 启动APP开发者模式
链联金服APP默认关闭了开发者模式，如果要开启，请打开"我的"-"设置"-"关于"，多次点击萤火图标，即可开启开发者模式

## 使用链联金服APP调试
打开"链联金服APP"，打开"探索"页，在右上角打开"+"号按钮，填写名称和应用访问地址，即可在"自定义应用"栏看到添加的应用，可以点击图标打开运行


## 获取钱包版本信息

 返回当前链联金服的版本信息，类型为字符串。如当前版本为 '2.1.8'。

```
  window.FFW.version    
```
 返回结果

```
'2.1.8'
```

## 获取钱包OS平台信息

 返回当前钱包所在设备的操作系统信息，类型为字符串，当前返回值为android或者ios。

```
window.FFW.platform
```

 返回结果

```
'android'
```

## 获取当前设备的UUID

 返回当前钱包所在的设备的UUID进行SHA256运算后的数据，类型为字符串。

```
window.FFW.uuid
```

 返回结果

```
'01a0865f4c2687d90f70f32b01c1e258bfd7aa6c7ccc35339dfacd72f5018bb8'
```

## 获取钱包的语言设置

 返回当前钱包使用的语言选项，类型为字符串。

```
window.FFW.locale
```

 返回结果

```
'zh_cn'
```

## 获取用户地址（ID）

 返回当前用户的地址，类型为字符串，如`GCENG5GLJ35GPJZQM3YJSFL3GMQ57MA5U6ZAAE6V4XIFVXFPY5MS5Q65`

```
window.FFW.address
```

 返回结果

```
'GCENG5GLJ35GPJZQM3YJSFL3GMQ57MA5U6ZAAE6V4XIFVXFPY5MS5Q65'
```

## 获取用户账户名称

 返回当前用户的账户名称，类型为字符串，如：`萤火小鹅`

```
window.FFW.accountName
```

  返回结果

```
'萤火小鹅'
```

## 获取当前用户设置的horizon服务器地址

  返回当前用户设置的horizon服务器地址，类型为字符串，如：`https://horizon.stellar.org`

```
window.FFW.horizonUrl
```

  返回结果

```
'https://horizon.stellar.org'
```  

## 获取horizon服务器的网络密语

  返回当前用户设置的horizon服务器的网络密码(network passphrase)

```
window.FFW.network
```

  返回

```
'Public Global Stellar Network ; September 2015'
```

## 获取用户余额（balance）

返回当前用户的资产信息。` balances(callback)`
恒星网络可以发行资产。因此用户可以拥有多种资产。使用此方法可以获取当前用户所有的资产信息。
此方法从钱包指定的horizon获取余额（balance）信息并返回。

- 参数说明
- `callback`是balance执行后的回调函数。可以是函数名称或者是一个函数。
- https://www.stellar.org/developers/horizon/reference/endpoints/accounts-single.html
- 在balance执行完毕后，`callback`将会接收一个对象，内容如下

```javascript
    {
        code:  'success | fail',     //success表示查询成功，fail表示查询失败。
        message:'提示信息 | 错误信息',
        data: []     //Array类型。内容为用户的资产状态信息。
     }
```

> 代码示例

```
window.FFW.balances(function(response){
        if(response.code === 'fail'){
             console.log('error:' + response.message)  
             alert('查询失败！'+response.message)
        }else{
             console.log('query for balances successfully')
             $("#balances_data").text(JSON.stringify(response.data))
             alert('查询余额成功')
        }
});
```

返回结果

```
[
    {
      "balance": "1.0000000",       //资产余额
      "limit": "707382697076.8900000",  //资产可持有的上限。通常在向用户发送时使用。
      "asset_type": "credit_alphanum4",   //资产类型，分别为credit_alphanum4和credit_alphanum12. 
      "asset_code": "XFF",        //资产代码
      "asset_issuer": "GAZEX2USUBMMWFRZFS77VDJYXUFLXI4ZGFPWX6TBNZCSTEQWNLFZMXFF"   //资产发行方
    },
    {
      "balance": "1.9999900",   //资产余额
      "asset_type": "native"       //native指代本地资产，即XLM
    }
]
```

## 支付功能（payment）


`pay(data, callback)`
使用该方法，可以提请用户进行指定支付。
参数说明：
`data`是一个JSON，需要包含以下内容

```javascript
   {
    destination: '接收方地址',  //字符串，必须填写
    code: '资产编码',           //字符串，必须填写
    issuer: '资产发行方',     //字符串，在发送原生资产XLM时，可不填写。其它资产均需要填写。
    amount: '资产发送数量', // number类型, 必须填写 
    memo_type: '备注类型', //字符串，选填，可取值：NONE TEXT HASH ID RETURN。 
    memo: '备注内容'   //字符串，选填，当memo_type为NONE时，不需要填写，memo_type为其它值时，需要填写。
   }
```
关于`code`，`issuer`的概念，参见[stellar 官方文档](https://www.stellar.org/developers/guides/concepts/assets.html)，[中文版](https://docs.stellarcn.org/developers/guides/concepts/assets.html)。
关于 `memo_type`和`memo`的概念，参见[这里](https://www.stellar.org/developers/guides/concepts/transactions.html#memo)，稍后会以汉语进行说明。
`callback` 是payment执行后的回调函数，可以是函数名称或者是一个函数。
在pay执行完毕后，`callback`将会接收一个对象，内容如下

```javascript
    {
        code:  'success | fail',     //success表示支付成功，fail表示支付失败。
        message:'提示信息 | 错误信息',
        data:'返回结果数据'     //object类型或null
     }
```

代码示例

```
window.FFW.pay({
         destination: 'GBFGPA6MELXHEKWPJW75LOMC4CHGHTZ67LOWUGTUUILMXMZZGFLTO3X7', 
         code: 'XFF', 
         issuer: 'GAZEX2USUBMMWFRZFS77VDJYXUFLXI4ZGFPWX6TBNZCSTEQWNLFZMXFF', 
         amount: 1, 
         memo_type: 'TEXT',  
         memo: 'Hello,FFW'
       }, function(response){
           if(response.code === 'fail'){
             console.log('error:' + response.message)  
             alert('支付失败！'+response.message)
           }else{
             console.log('pay success')
             alert('支付成功')
             //后续代码
           }
});
```

## 路径支付功能（path payment)


WIP...

## 使用用户当前密钥签名（sign)


` sign(data, callback)` 
使用该方法可以对数据进行签名，可以用于权限验证，比如应用可以在执行某些需要验证用户身份的操作之前，提供一些数据让用户进行签名鉴权。可以用来做用户登录。
参数说明：
`data`是一个JSON格式的字符串。data 的长度限制（WIP）
`callback` 是sign执行后的回调函数，可以是函数名称或者是一个函数。
在`sign`执行完毕后，`callback`将会接收一个对象，内容如下

```javascript
    {
        code:  'success | fail',     //success表示签名成功，fail表示签名失败。
        message:'提示信息 | 错误信息',
        data:'返回结果数据'     //base64编码字符串类型或null
     }
```


代码示例

```
let data = {name: 'firefly wallet dapp',desc:'the first hello in the world'}
data = JSON.stringify(data)
console.log('待签名的数据:' +data)
window.FFW.sign(data, function(response){
    if(response.code === 'fail'){
        console.log('error:' + response.message)  
    }else{
        console.log('success')
        console.log('签名后的结果：'+response.data)
    }
})
```

返回结果

```
待签名的数据:{"time":1533626528508,"address":"GACJFMOXTSE7QOL5HNYI2NIAQ4RDHZTGD6FNYK4P5THDVNWIKQDGOODU"}
签名后的结果:4foYmY0Nrx1QPT5CfJEsJcYM0o40l4sHDo8aHJ0mHNq0ZY9Q7753FieHXBK3dJJ32+Lhw3UIJnzF2pplyo3LBg==

```

## 验证签名（validate)

WIP...

## 提请用户信任资产（trust）


`trust(code, issuer, callback)`
使用该方法，可以提请用户信任指定的资产。
参数说明：
`code`格式为字符串。内容为字母数字，即[a-z][A-Z][0-9]，长度限制为1-12字符。
`issuer`格式为字符串，内容为地址。如`GCKKUWHT3ILQWWKQ3MUOCAC7LRJNLCOES7SEI6TCQVGZD4GCULO2PGNU`。
`callback` 是trust执行后的回调函数，可以是函数名称或者是一个函数。
在`trust`执行完毕后，`callback`将会接收一个对象，内容如下


代码示例

```
var code = 'XFF';
var issuer = 'GAZEX2USUBMMWFRZFS77VDJYXUFLXI4ZGFPWX6TBNZCSTEQWNLFZMXFF';
window.FFW.trust(code,issuer,function(response){
   if(response.code === 'fail'){
    console.log('error:' + response.message)  
       alert('授信失败')
    }else{
       console.log('trust success')
       alert('授信成功')
    }
})
```

![调用界面](https://static.oschina.net/uploads/space/2018/0808/003018_3Kcb_109284.png)

## 请求用户签署XDR（signXDR）


` signXDR(data, message, callback)`
`signXDR`是一个底层方法。当Firefly提供的API无法直接满足需求时，可以使用此方法进行高级操作。
使用前提：需要了解恒星底层SDK，能够手工构造Transaction封包。当构造并生成XDR格式的tranaction后，可以提请用户对Tx进行签名，签名后提交到网络。
参数说明：
`data` 字符串，构造的XDR格式的transaction。
~~`message` 字符串，用于告知用户此Tx的用途。~~
`callback` 是signXDR执行后的回调函数，可以是函数名称或者是一个函数。

在`signXDR`执行完毕后，`callback`将会接收一个对象，内容如下

```javascript
    {
        code:  'success | fail',     //success表示签署成功，fail表示签署失败。
        message:'提示信息 | 错误信息',
        data:'返回结果数据'     //base64编码字符串类型或null
     }
```

*代码示例*

```
var xdr = 'AAAAAEpng8wi7nIqz02/1bmC4I5jzz763WoadKIWy7M5MVc3AAAAZACHjkkAAAABAAAAAAAAAAAAAAABAAAAAAAAAAoAAAALaG9tZV9kb21haW4AAAAAAQAAABBodHRwOi8vZmNoYWluLmlvAAAAAAAAAAA='
 window.FFW.signXDR(xdr, "更新主域名", function(response){
  if(response.code === 'fail'){
    console.log('error:' + response.message)  
    alert('签名失败！'+response.message)
  }else{
    console.log('签名成功,数据可以直接提交到Horizon')
    console.log(response.data)
  }
})
```

![调用界面](https://static.oschina.net/uploads/space/2018/0808/005124_ty0v_109284.png)

## 扫描二维码功能（scan）


`scan(callback) `
使用该方法可以调用扫描功能，并获取二维码扫描结果。
参数说明：
`callback` 是scan执行后的回调函数，可以是函数名称或者是一个函数。
在`scan`执行完毕后，`callback`将会接收一个对象，内容如下
```javascript
    {
        code:  'success | fail',     //success表示签署成功，fail表示签署失败。
        message:'提示信息 | 错误信息',
        data:'返回结果数据'     //字符串类型或null
     }
```

代码示例

```
window.FFW.scan(function(response){
  if(response.code === 'fail'){
    console.log('error:' + response.message)  
  }else{
     console.log('scan result:' + response.data)//response.data是二维码的扫描结果，字符串类型
  }
 })
  
```

## 分享功能（share)

`share(options,callback)`
使用此方法，可以调用系统的分享功能。分享实现见[这里](https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin)

`options`是一个JSON，需要包含以下内容

`分享功能`
```javascript
   {
    message: '分享图片',  //字符串，必须填写
    url: 'https://fchain.io',//字符串类型，选填，要分享的网址
    files: ['图片内容'],           //数组，选填，支持远程图片地址或base64格式的图片等。如
   }
```

`callback` 是share执行后的回调函数，可以是函数名称或者是一个函数。
在`share`执行完毕后，`callback`将会接收一个对象，内容如下
```javascript
    {
        code:  'success | fail',     //success表示成功，fail表示失败。
        message:'提示信息 | 错误信息'
    }
```

代码示例

```
let options = {
   message: '分享图片',
   files: ['data:image/png;base64,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']
}
window.FFW.share(options,function(response){
  if(response.code === 'fail'){
    console.log('error:' + response.message)  
  }else{
    console.log('share success')
  }
})

```
