## JS Bridge接口协议

链联金服给JS（即DAPP）提供的原生能力

- 取消back recovery两个接口

## 通过npm引用帮助类库
- 可以通过[wallet-api](https://github.com/fchainio/fireflywallet-api)，通过NPM或yarn引入，调用以下接口


### 所有接口函数说明
|函数名|参数|函数说明|
|:---- |:---- |:---- |:---- |
|balances|callback:Function|返回当前登陆账户的余额|
|sign|data:Object,callback:Function|对JSON格式的data数据进行签名|
|pay|data:Object,callback:Function|支付功能，将提交的hash结果返回|
|pathPayment|data:Object,callback:Function|路径支付，将提交的hash结果返回|
|trust|code:String,issuer:String,callback:Function|授信资产，将授信结果返回|
|signXDR|data:String,callback:Function|XDR签名|
|scan|callback:Function|打开扫描二维码界面|
|openDApp|appid:String|打开其他DApp|
|initWindow|options:Object|初始化当前界面的窗口|



## 接口代码整理说明
```
/**
 * 接口根对象
 */
window.FFW = {

  /**
   * 当前钱包版本号（v2.1.0添加，未正式上线）
   */
  version:'2.2.6',
  /**
   * 当前钱包的操作系统，ios或android，（v2.1.0添加）
   */
  platform: 'ios',

  /**
   * 属性，String类型
   * 当前打开DAPP的钱包的登陆账户公钥地址
   */
  address: 'GCENG5GLJ35GPJZQM3YJSFL3GMQ57MA5U6ZAAE6V4XIFVXFPY5MS5Q65',
  /**
   * 属性，Array类型
   * 当前打开DAPP的钱包的联系人信息
   * 2.4版本后取消
   */
  contacts: [],

  /**
   * 属性，Array类型
   * 当前打开DAPP的钱包的地址簿
   * 2.4版本后取消
   */
  myaddresses: [],
  
 /**
  * 当前设备的UUID信息，针对该信息进行了加密后提供出来的
  */
  uuid = '设备的UUID信息加密信息',

 /**
  * 当前钱包的语言设置
  */
  locale = 'zh_cn';

   /**
   * 查询账户余额
   * @param callback: function类型，接收参数为response,
   * {
   *   code: 'success或fail', 
   *   message: '提示信息或错误信息', 
   *   data: Array类型，数据来自于account的balances属性，见https://www.stellar.org/developers/horizon/reference/endpoints/accounts-single.html中account的balances属性
   * }
   */
   balances(callback){
        //code
   };

  /**
   * 支付方法
   * @param {Object} data 参数
   *  data: {
   *    destination: '接收方的公钥G地址', 
   *    code: '资产编码', 
   *    issuer: '资产发行方', 
   *    amount: '资产发送数量，number类型', 
   *    memo_type: '备注类型，可取值：NONE TEXT HASH ID RETURN', 
   *    memo: '备注'
   *  }
   * @param {string,function} callback 回调函数，可以是函数名称也可以是函数，
   *      回调函数接收一个对象
   *        {
   *            code:'可取fail或success,false表示失败，success表示处理成功',
   *            message:'提示信息',
   *            data:'返回结果数据，是object类型，可能为null'
   *          }
   * 示例：
   *   FFW.pay({
   *      destination: 'GBFGPA6MELXHEKWPJW75LOMC4CHGHTZ67LOWUGTUUILMXMZZGFLTO3X7', 
   *      code: 'XFF', 
   *      issuer: 'GAZEX2USUBMMWFRZFS77VDJYXUFLXI4ZGFPWX6TBNZCSTEQWNLFZMXFF', 
   *      amount: 100, 
   *      memo_type: 'TEXT', 
   *      memo: 'Hello,FFW'
   *    }, function(response){
   *        if(response.code === 'fail'){
   *          console.log('error:' + response.message)  
   *        }else{
   *          console.log('pay success')
   *        }
   *    })
   */
  pay(data, callback){
    // code
  },

  /**
   * 路径支付方法
   * @param {Object} data 参数
   *  data: {
   *    destination: '接收方的公钥G地址', 
   *    code: '资产编码', 
   *    issuer: '资产发行方', 
   *    amount: '资产发送数量，number类型', 
   *    memo_type: '备注类型，可取值：NONE TEXT HASH ID RETURN', 
   *    memo: '备注'
   *  }
   * @param {string或function} callback 回调函数，可以是函数名称也可以是函数
   *      回调函数接收一个对象
   *        {
   *            code:'可取fail或success,false表示失败，success表示处理成功',
   *            message:'提示信息',
   *            data:'返回结果数据，是object类型，可能为null'
   *          }
   * 示例：
   *   FFW.pathPayment({
   *      destination: 'GBFGPA6MELXHEKWPJW75LOMC4CHGHTZ67LOWUGTUUILMXMZZGFLTO3X7', 
   *      code: 'XFF', 
   *      issuer: 'GAZEX2USUBMMWFRZFS77VDJYXUFLXI4ZGFPWX6TBNZCSTEQWNLFZMXFF', 
   *      amount: 100, 
   *      memo_type: 'TEXT', 
   *      memo: 'Hello,FFW'
   *    }, function(response){
   *        if(response.code === 'fail'){
   *          console.log('error:' + response.message)  
   *        }else{
   *          console.log('success')
   *        }
   *    })
   */
  pathPayment(data, callback){
    //code
  },

  /**
   * 对数据进行签名，主要是针对一些数据进行签名，方便后台应用确认当前操作人员具有账户的权限，防止恶意请求
   * @param {String} data 要进行签名的数据，必须为json数据类型，然后转为String格式，由于json数据转到后台之后，要保证后台取的json数据和前台的json数据格式字段顺序一致，否则会校验失败
   * @param {string或function} callback 回调函数，可以是函数名称也可以是函数
   *      回调函数接收一个对象
   *        {
   *            code:'可取fail或success,false表示失败，success表示处理成功',
   *            message:'提示信息',
   *            data:'返回结果数据，是string类型，返回签名完成后数据的base64结果'
   *          }
   *    示例：
   *    let data = {name: 'firefly wallet dapp'}
   *    data = JSON.stringify(data)
   *    FFW.sign(data, function(response){
   *        if(response.code === 'fail'){
   *          console.log('error:' + response.message)  
   *        }else{
   *          console.log('do success')
   *          console.log('对{name: "firefly wallet dapp"}签名后的结果：'+response.data)
   *        }
   *    })
   */
  sign(data, callback){
    //code
  },

  /**
   * 针对transaction生成的xdr进行签名，生成可提交到horizon的transaction xdr
   * @param {string} data 必须为transaction生成的xdr 
   * @param {String} message 提示信息
   * @param {string或function} callback ,回调函数，可以是函数名称也可以是函数
   *      回调函数接收一个对象
   *        {
   *            code:'可取fail或success,false表示失败，success表示处理成功',
   *            message:'提示信息',
   *            data:'返回结果数据，是string类型，返回签名完成后transaction对应的xdr'
   *          }
   * 示例：
   *   let xdr = 'AAAAAEpng8wi7nIqz02/1bmC4I5jzz763WoadKIWy7M5MVc3AAAAZACHjkkAAAABAAAAAAAAAAAAAAABAAAAAAAAAAoAAAALaG9tZV9kb21haW4AAAAAAQAAABBodHRwOi8vZmNoYWluLmlvAAAAAAAAAAA='
   *   FFW.signXDR(xdr, function(response){
   *        if(response.code === 'fail'){
   *          console.log('error:' + response.message)  
   *        }else{
   *          console.log('do success')
   *          console.log('对XDR签名后的XDR结果：'+response.data)
   *        }
   *    })
   */
  signXDR(data, message, callback){
    // code
  },
  /**
   * 2.4版本后取消
   * 备份数据，备份当前用户的contact和myaddress
   * @param {string或function} callback 回调函数，可以是函数名称也可以是函数
   *      回调函数接收一个对象
   *        {
   *            code:'可取fail或success,false表示失败，success表示处理成功',
   *            message:'提示信息',
   *            data:'返回结果数据，是string类型，返回对contact和myaddress加密后的数据,可以直接保存该结果到系统中'
   *          }
   * 示例：
   *   FFW.backup(function(response){
   *        if(response.code === 'fail'){
   *          console.log('error:' + response.message)  
   *        }else{
   *          console.log('do success')
   *          console.log('加密后的备份数据：'+response.data)
   *        }
   *    })
   */
  backup(callback){
    //code
  },

  /**
   * 2.4版本后取消
   * 恢复数据函数，根据backup函数加密备份后的数据，重新恢复到当前钱包中进行覆盖
   * @param {string} data 
   * @param {string或function} callback 回调函数，可以是函数名称也可以是函数
   *      回调函数接收一个对象
   *        {
   *            code:'可取fail或success,false表示失败，success表示处理成功',
   *            message:'提示信息'
   *          }
   * 示例：
   *   //其中，data是backup备份操作后拿到的数据
   *   FFW.recovery(data,function(response){
   *        if(response.code === 'fail'){
   *          console.log('error:' + response.message)  
   *        }else{
   *          console.log('do success')
   *        }
   *    })
   */
  recovery(data, callback){
    //code
  },
  /**
   * 授信资产
   * @param {string} code 资产编码
   * @param {string} issuer 资产发行方 
   * @param {string或function} callback 回调函数，可以是函数名称，也可以是函数
   *      回调函数接收一个对象
   *        {
   *            code:'可取fail或success,false表示失败，success表示处理成功',
   *            message:'提示信息'
   *          }
   * 示例：
   *   let code = 'XFF';
   *   let issuer = 'GAZEX2USUBMMWFRZFS77VDJYXUFLXI4ZGFPWX6TBNZCSTEQWNLFZMXFF';
   *   FFW.trust(code,issuer,function(response){
   *        if(response.code === 'fail'){
   *          console.log('error:' + response.message)  
   *        }else{
   *          console.log('do success')
   *        }
   *    })
   */
  trust(code, issuer, callback){
    //code
  }

 /**
  * 打开二维码扫描功能，接收回调函数，用于接收二维码的扫描结果
  * 示例：
  *   FFW.scan(function(response){
  *        if(response.code === 'fail'){
  *          console.log('error:' + response.message)  
  *        }else{
  *          console.log('scan result:' + response.data)//response.data是二维码的扫描结果，字符串类型
  *        }
  *    })
  */ 
  scan(callback){
   // code
  }

  /**
   * 调用共享功能，具体的分享实现见：https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
   * @param {Object} options 设置参数
   * @param {string或function} callback 回调函数，可以是函数名称，也可以是函数
   *      回调函数接收一个对象
   *        {
   *            code:'可取fail或success,false表示失败，success表示处理成功',
   *            message:'提示信息'
   *          }
   * 示例：
   *   let options = {
   *      message: '分享图片',
   *      files: ['data:image/png;base64,iVBORw0......K5CYII='], //图片，支持远程图片或base64格式的图片等
   *     };
   *   FFW.share(options,function(response){
   *        if(response.code === 'fail'){
   *          console.log('error:' + response.message)  
   *        }else{
   *          console.log('share success')
   *        }
   *    })
   */
  share(options,callback){
    //code
  }
  /**
   * 跳转到其他的DAPP中
   * @param {String} 其他dapp的dappid的值
   * 
   */
  openDApp(dappid){

  }

  /**
   * 初始化窗口界面
   * @param {Object} config 配置信息
   * 示例：
   * {
   *   "navigationBarBackgroundColor":"#ffffff", //String 导航栏的背景色
   *   "navigationBarTextStyle":"black or white" //String 导航栏的字段颜色，支持black或white取值
   *    "navigationBarTitleText":""//String,导航栏标题文字内容
   *    "themeStyle":""//String, 主题， dark或white
   *    "navigationStyle":"" //String 导航栏样式，仅支持以下值：default 默认样式,custom 自定义导航栏，只保留右上角胶囊按钮
   * }
   * 
   * @param {Function} callback 
   * 
   */
  initWindow(config, callback){
    //code
  };

}
```
