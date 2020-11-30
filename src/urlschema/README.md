## URL Schema协议

默认需要支持的协议包括：
 1. xff://open.qlchain.io
    - scheme: xff  
    - host: open.qlchain.io
 2. web+stellar://
    - 参考实现自官方标准[SEP0007](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0007.md)

---

支持的应用场景


|操作名称|适用协议|是否实现|
|:---|:---|:---|
|启动APP|XFF|√|
|创建钱包账户|XFF|√
|打开行情|XFF|√|
|添加联系人|XFF|√|
|授信|XFF、web+stellar|√|
|支付|XFF、web+stellar|√|
|路径支付|XFF、web+stellar|√|
|TX签名|XFF、web+stellar|×|
|充币|XFF|√|
|提币|XFF|√|
|设置通胀池|XFF|√|
|打开DAPP详情|XFF|√|
|打开DAPP|XFF|√|
|打开币红包|XFF|√|
|领取币红包|XFF|√|
|查看红包记录、发红包|XFF|√|
|打开某个资产详情|XFF|√|
|扫码登陆|https|√|

---

例子中的XDR、HASH数据可能并不正确，只是演示使用的


---
## 启动App
- 协议URL
    - xff://open.qlchain.io/app/start/
- 协议示例
```
xff://open.qlchain.io/app/start/
```
- 参数说明
    - 无需参数

---
## 钱包
### 创建或者导入钱包页面
- 协议URL
    - xff://open.qlchain.io/wallet/create/
- 协议示例
```
xff://open.qlchain.io/wallet/create/
```
- 参数说明
 
|参数名|类型|是否必须|参数说明|  
|-----|-----|-----|----|
|name|string|false|钱包名称|
|mnemonic|string|false|助记词|
|seed|string|false|密钥|
---

## 行情
### 打开交易对(K线图)
- 协议URL
    - xff://open.qlchain.io/market/kline
- 协议示例
```
xff://open.qlchain.io/market/kline?basecode=XLM&baseissuer=&countercode=XCN&counterissuer=GCNY5OXYSY4FKHOPT2SPOQZAOEIGXB5LBYW3HVU3OWSTQITS65M5RCNY
```

- 参数说明

|参数名|类型|是否必须|参数说明|  
|-----|-----|-----|----|
|basecode|string|true|base代码|
|baseissuer|string|true|base发行方 可为空|
|countercaode|string|true|counter代码|
|counterissuer|string|true|counter发行方 可为空|

## 添加自定义交易对
- 协议URL
    - xff://open.qlchain.io/market/addpair
- 协议示例
```
xff://open.qlchain.io/market/addpair?basecode=XLM&baseissuer=&countercode=XCN&counterissuer=GCNY5OXYSY4FKHOPT2SPOQZAOEIGXB5LBYW3HVU3OWSTQITS65M5RCNY
```
- 参数说明

|参数名|类型|是否必须|参数说明|  
|-----|-----|-----|----|
|basecode|string|true|base代码|
|baseissuer|string|true|base发行方 可为空|
|countercaode|string|true|counter代码|
|counterissuer|string|true|counter发行方 可为空|
---

## Dapp
## 探索Tab打开Dapp信息页
- 协议URL 
    - xff://open.qlchain.io/discovery/dappinfo
- 协议示例
```
xff://open.qlchain.io/discovery/dappinfo?title=dappname&appId=000001 
```
- 参数说明

|参数名|类型|是否必须|参数说明|  
|-----|-----|-----|----|
|title|string|false|页面标题(dappname)|
|appId|string|true|Dapp的appId|

## 打开具体Dapp
- 协议URL 
    - xff://open.qlchain.io/dapp/container
- 协议示例
```
xff://open.qlchain.io/dapp/container?title=dappname&appId=000001&url=http://qlchain.io&color=#313035
```
- 参数说明，可以添加其他参数，并传递下去，从而在打开DApp时，由DApp自行获取，进行不同的业务处理

|参数名|类型|是否必须|参数说明|  
|-----|-----|-----|----|
|title|string|false|页面标题(dappname)|
|appId|string|false|要打开的Dapp的appId|
|url|string|true|dapp具体的访问地址|
|color|string|false|dapp的工具栏颜色|
---

## 添加联系人
### 打开添加联系人界面，给用户添加联系人
- 协议URL
    - XFF://open.qlchain.io/contacts/create
- 示例
```
XFF://open.qlchain.io/contacts/create?name=开放平台&account=GBUKVELXNRMYA4ZZXCVDPNCKZNZ2AOU5IE45ASAFGPF7EDTZCVJU42UA&memo_type=MEMO_TEXT&memo=123
```
- 参数说明

|参数名|类型|是否必填|说明|
|:---|:---|:---|:---|
|name|string|false|联系人名称|
|account|string|true|账号地址|
|memo_type|string|false|备注类型，可选MEMO_TEXT\MEMO_ID\MEMO_HASH\MEMO_RETURN|
|memo|string|false|备注信息|
---

## 授信
### 打开资产授信界面，直接授信某个资产，类似于JSBridge的FFW.trust功能,如果有callback参数，则将提交hash或失败的结果返回到callback中
- 协议URL
   - XFF://open.qlchain.io/trust
- 示例
```
XFF://open.qlchain.io/trust?code=XCN&issuer=GCNY5OXYSY4FKHOPT2SPOQZAOEIGXB5LBYW3HVU3OWSTQITS65M5RCNY&callback=https%3A%2F%2Fopen.qlchain.io%2Ftrust%2Fcallback%2F123
```
```
web+stellar:trust?code=XCN&issuer=GCNY5OXYSY4FKHOPT2SPOQZAOEIGXB5LBYW3HVU3OWSTQITS65M5RCNYcallback=https%3A%2F%2Fopen.qlchain.io%2Ftrust%2Fcallback%2F123
```
- 参数

|参数名|类型|是否必填|说明|
|:---|:---|:---|:---|
|code|string|true|资产名称|
|issuer|string|true|资产发行方|
|network|string|false|恒星网络，可选`public`或`test`|
|msg|string|false|操作说明|
|callback|string|false|回调地址|
- 回调地址，提交参数，采用POST方式提交，`Content-Type`为`application/json`
 
```
# 正确结果，返回hash值
{
    "tx_hash":"a3ae1da71646b25c66ce9f00cbd8bba0e7d5705529ccd4b746a85cd7c951509f"
}
# 发生错误，提交错误信息 
{
    "error":"tx的错误码"
}
```
---

## 支付
### 打开支付界面，用户确认是否给某个账号发送资产，并且支持结果回调
- 协议
    - XFF、web+stellar 
- 示例
```
XFF://open.qlchain.io/pay?destination=GAD2EAYW6UXQPY6FLEPKOZEABVRU42SQAQVXQ5VOOAERNSTLXK3Q5UZ6&amount=1&asset_code=XFF&asset_issuer=GAZEX2USUBMMWFRZFS77VDJYXUFLXI4ZGFPWX6TBNZCSTEQWNLFZMXFF&memo_type=MEMO_TEXT&memo=pay&msg=test&callback=https%3A%2F%2Fopen.qlchain.io%2Ftrust%2Fcallback%2F123
```
```
web+stellar:pay?destination=GAD2EAYW6UXQPY6FLEPKOZEABVRU42SQAQVXQ5VOOAERNSTLXK3Q5UZ6&amount=1&asset_code=XFF&asset_issuer=GAZEX2USUBMMWFRZFS77VDJYXUFLXI4ZGFPWX6TBNZCSTEQWNLFZMXFF&memo_type=MEMO_TEXT&memo=pay&msg=test&callback=https%3A%2F%2Fopen.qlchain.io%2Ftrust%2Fcallback%2F123
```
- 参数

|参数名|类型|是否必填|说明|
|:---|:---|:---|:---|
|destination|string|true|收款地址|
|asset_code|string|false|资产代码，没有值则默认为XLM|
|asset_issuer|string|false|资产发行方|
|memo_type|string|false|备注类型，可选MEMO_TEXT\MEMO_ID\MEMO_HASH\MEMO_RETURN|
|memo|string|false|备注信息|
|msg|string|false|给用户的提示信息|
|network|string|false|恒星网络，可选`public`或`test`|
|callback|string|false|回调地址|
- 回调地址，提交参数，采用POST方式提交，Content-Type为application/json
```
# 正确结果，返回hash值
{
    "tx_hash":"a3ae1da71646b25c66ce9f00cbd8bba0e7d5705529ccd4b746a85cd7c951509f"
}
# 发生错误，提交错误信息
{
    "error":"tx的错误码"
}
```
---

## 路径支付
### 支持路径支付功能，由用户选择不同的资产进行支付，存在一定的失败概率，操作基本与FFW.pathPayment相同
- 协议
  - XFF
  - web+stellar
- 示例
```
XFF://open.qlchain.io/pathpay?destination=GAD2EAYW6UXQPY6FLEPKOZEABVRU42SQAQVXQ5VOOAERNSTLXK3Q5UZ6&amount=1&asset_code=XFF&asset_issuer=GAZEX2USUBMMWFRZFS77VDJYXUFLXI4ZGFPWX6TBNZCSTEQWNLFZMXFF&memo_type=MEMO_TEXT&memo=pay&msg=test&callback=https%3A%2F%2Fopen.qlchain.io%2Ftrust%2Fcallback%2F123
```
```
web+stellar://open.qlchain.io/pathpay?destination=GAD2EAYW6UXQPY6FLEPKOZEABVRU42SQAQVXQ5VOOAERNSTLXK3Q5UZ6&amount=1&asset_code=XFF&asset_issuer=GAZEX2USUBMMWFRZFS77VDJYXUFLXI4ZGFPWX6TBNZCSTEQWNLFZMXFF&memo_type=MEMO_TEXT&memo=pay&msg=test&callback=https%3A%2F%2Fopen.qlchain.io%2Ftrust%2Fcallback%2F123
```
- 参数

|参数名|类型|是否必填|说明|
|:---|:---|:---|:---|
|destination|string|true|收款地址|
|asset_code|string|false|资产代码，没有值则默认为XLM|
|asset_issuer|string|false|资产发行方|
|memo_type|string|false|备注类型，可选MEMO_TEXT\MEMO_ID\MEMO_HASH\MEMO_RETURN|
|memo|string|false|备注信息|
|msg|string|false|给用户的提示信息|
|network|string|false|恒星网络，可选`public`或`test`|
|callback|string|false|回调地址|
- 回调地址，提交参数，采用POST方式提交，Content-Type为application/json
```
# 正确结果，返回hash值
{
    "tx_hash":"a3ae1da71646b25c66ce9f00cbd8bba0e7d5705529ccd4b746a85cd7c951509f"
}
# 发生错误，提交错误信息
{
    "error":"tx的错误码"
}
```
---

## TX签名
### 对收到的TX数据进行签名，根据参数选择是提交是由APP提交到网络上，还是要进行签名后，提交给网站，TX的数据展示要考虑细化，更友好
- 协议
  - XFF
  - web+stellar
- 示例
```
XFF://open.qlchain.io/tx?xdr=AAAAAAeiAxb1LwfjxVkep2SADWNOalAEK3h2rnAJFsprurcOAAAAZADOysIAAAG7AAAAAQAAAAAAAAAAAAAAAAAAAAAAAAABAAAABua1i%2BivlQAAAAAAAQAAAAAAAAABAAAAAAeiAxb1LwfjxVkep2SADWNOalAEK3h2rnAJFsprurcOAAAAAAAAAAAAmJaAAAAAAAAAAAA%3D&msg=test&pubkey=GAD2EAYW6UXQPY6FLEPKOZEABVRU42SQAQVXQ5VOOAERNSTLXK3Q5UZ6&callback=https%3A%2F%2Fopen.qlchain.io%2Ftrust%2Fcallback%2F123
```
```
web+stellar:tx?xdr=AAAAAAeiAxb1LwfjxVkep2SADWNOalAEK3h2rnAJFsprurcOAAAAZADOysIAAAG7AAAAAQAAAAAAAAAAAAAAAAAAAAAAAAABAAAABua1i%2BivlQAAAAAAAQAAAAAAAAABAAAAAAeiAxb1LwfjxVkep2SADWNOalAEK3h2rnAJFsprurcOAAAAAAAAAAAAmJaAAAAAAAAAAAA%3D&msg=test&pubkey=GAD2EAYW6UXQPY6FLEPKOZEABVRU42SQAQVXQ5VOOAERNSTLXK3Q5UZ6&&callback=https%3A%2F%2Fopen.qlchain.io%2Ftrust%2Fcallback%2F123
```
- 参数

|参数名|类型|是否必填|说明|
|:---|:---|:---|:---|
|xdr|string|true|transaction的xdr格式，做了url encode|
|msg|string|false|给用户提示信息|
|pubkey|string|false|指定签名账号，针对于多签的情况|
|network|string|false|恒星网络，可选`public`或`test`|
|auto|boolean|false|是否由钱包APP提交到恒星网络，默认为`true`，为`false`则将签名后的结果XDR提交给callback|
|callback|string|false|回调地址|
- 回调地址，提交参数，采用POST方式提交，Content-Type为application/json
```
# 处理正确，如果auto没有值或为`true`，则提交transaction的hash结果给`callback`
{
    "tx_hash":"a3ae1da71646b25c66ce9f00cbd8bba0e7d5705529ccd4b746a85cd7c951509f"
}
# 处理正确，如果auto为`false`，则提交签名后的transaction为xdr，并提交到`callback`
{
    "xdr":"AAAAAAeiAxb1LwfjxVkep2SADWNOalAEK3h2rnAJFsprurcOAAAAZADOysIAAAG7AAAAAQAAAAAAAAAAAAAAAAAAAAAAAAABAAAABua1i+ivlQAAAAAAAQAAAAAAAAABAAAAAAeiAxb1LwfjxVkep2SADWNOalAEK3h2rnAJFsprurcOAAAAAAAAAAAAmJaAAAAAAAAAAAA="
}
# 发生错误，提交错误信息
{
    "error":"错误信息"
}
```
---

## 充币
### 打开充币界面，根据协议中是否有指定资产进行查询，否则由用户选择相应的资产进行查询，方便用户复制相应的内容，如果指定了`callback`，则由用户点击确定按钮后，将接收到的充币数据原样提交到`callback`中
- 协议
  - XFF
- 示例
```
XFF://open.qlchain.io/deposit?asset_code=ETH&asset_issuer=GBETHKBL5TCUTQ3JPDIYOZ5RDARTMHMEKIO2QZQ7IOZ4YC5XV3C2IKYU&
callback=https%3A%2F%2Fopen.qlchain.io%2Ftrust%2Fcallback%2F123
```
- 参数

|参数名|类型|是否必填|说明|
|:---|:---|:---|:---|
|asset_code|string|false|资产名称|
|asset_issuer|string|false|资产发行方|
|msg|string|false|用户提示信息|
|callback|string|false|回调地址|
- 回调，有callback时才会回调，提交参数，采用POST方式提交，Content-Type为application/json
```
# 处理正确，将anchor服务器返回的信息提交到给`callback`
{
    "account":"当前登陆账户",
    "asset_code": "ETH",//要充到恒星上的币
    "asset_issuer": "GBETHKBL5TCUTQ3JPDIYOZ5RDARTMHMEKIO2QZQ7IOZ4YC5XV3C2IKYU",
    "how":"充币地址",//对应的ETH BTC上的地址，充币地址，来自于anchor
    "eta":100,//预估用时，来自于anchor
    "min_amount":1,//最小充币数量，来自于anchor
    "max_amount":100,//最大充币数量，来自于anchor
    "fee_fixed":1,//固定收费金额，来自于anchor
    "fee_percent":0.01,//收费比例，来自于anchor
    "extra_info":{}//额外信息，来自于anchor
}
# 发生错误，提交错误信息
{
    "error":"错误信息"
}
```
---

## 提币
### 打开提币的界面，直接从URL获取到提示的地址等信息，由用户确认后即可完成提币
- 协议
  - XFF
- 示例
```
XFF://open.qlchain.io/withdraw?destination=1MVrxv4712psDBRMwzLAhJTu2jGHeBqU6H&asset_code=BTC&asset_issuer=GATEMHCCKCY67ZUCKTROYN24ZYT5GK4EQZ65JJLDHKHRUZI3EUEKMTCH&amount=1&memo=123&callback=https%3A%2F%2Fopen.qlchain.io%2Ftrust%2Fcallback%2F123
```
- 参数

|参数名|类型|是否必填|说明|
|:---|:---|:---|:---|
|destination|string|true|提币地址|
|asset_code|string|true|提币资产代码，恒星资产|
|asset_issuer|string|true|提币资产发行方，恒星资产|
|amount|number|false|提币数量|
|msg|string|false|用户提示信息|
|memo|string|false|备注信息，提币第1次请求时用到|
|callback|string|false|回调地址|
- 回调，有callback时才会回调，提交参数，采用POST方式提交，Content-Type为application/json

```
# 处理正确
{
    "tx_hash":"提币操作在恒星网络上完成后得到的tx hash值"
}
# 发生错误，提交错误信息
{
    "error":"错误信息"
}
```
---

## 设置通胀池
### 给当前账户设置通胀池
- 协议
  - XFF
- 示例
```
XFF://open.qlchain.io/pool?destination=GDCHDRSDOBRMSUDKRE2C4U4KDLNEATJPIHHR2ORFL5BSD56G4DQXL4VW&msg=test&callback=https%3A%2F%2Fopen.qlchain.io%2Ftrust%2Fcallback%2F123
```
- 参数

|参数名|类型|是否必填|说明|
|:---|:---|:---|:---|
|destination|string|true|通胀池地址|
|msg|string|false|用户提示信息|
|callback|string|false|回调地址|
- 回调，有callback时才会回调，提交参数，采用POST方式提交，Content-Type为application/json
```
# 处理正确
{
    "tx_hash":"操作成功后得到的tx hash值"
}
# 发生错误，提交错误信息
{
    "error":"错误信息"
}
```
---

## 打开币红包 
### 直接打开币红包DAPP，考虑将DAPP数据内置到服务器中，币红包的`appid=000003`，打开该DApp将类似于直接调用`xff://open.qlchain.io/dapp/container?appId=000003`
- 协议
  - XFF
- 示例
```
xff://open.qlchain.io/hb
```
---

## 领取币红包
### 协议只是在上边的URL基础上，添加了参数`k`，在打开红包DApp时，把k作为参数传递下去即可
- 协议
  - XFF
- 示例
```
xff://open.qlchain.io//hb/dapp?k=红包口令
```
- 参数

|参数名|类型|是否必填|说明|
|:---|:---|:---|:---|
|k|string|false|红包口令|
---

## 查看红包记录或发红包
### 协议只是在上边的URL基础上，添加了参数`v`，在打开红包DApp时，把`v`作为参数传递下去即可
- 协议
  - XFF
- 示例
  - xff://open.qlchain.io/hb?v=log
- 参数

|参数名|类型|是否必填|说明|
|:---|:---|:---|:---|
|v|string|false|视图，`log`表示打开红包记录，`pay`表示打开发红包界面|
---

## 打开资产详情
### 打开某个资产的详情界面，主要应用场景是针对于用户是否收到资产之类
- 协议
  - XFF
- 示例
```
xff://open.qlchain.io/asset?asset_code=ETH&asset_issuer=GBETHKBL5TCUTQ3JPDIYOZ5RDARTMHMEKIO2QZQ7IOZ4YC5XV3C2IKYU
```
- 参数

|参数名|类型|是否必填|说明|
|:---|:---|:---|:---|
|asset_code|string|false|资产编码，没有值时默认为XLM|
|asset_issuer|string|false|资产发行方，没有值时默认为XLM|
---

## 扫码登陆
### 实现扫码登陆功能，实现方案待公开
---