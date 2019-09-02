import {config} from '../config.js';

//错误信息数组
const tips = {
  1:"抱歉，出现了一个错误",
  1005:"appKey无效，请到www.7yue.pro重新获取",
  3000:"期刊不存在"
}

class HTTP{
  //类下面的函数一般称为方法。
  request(params){
    if(!params.method){
      params.method="GET";
    };
    wx.request({
      url:config.api_base_url+params.url,
      method:params.method,
      data:params.data,
      header:{
        'content-type':'application/json',
        'appkey':config.appkey
      },
      success:(res)=>{
        let code = res.statusCode.toString();
        //startsWith
        //endsWith
        if(code.startsWith('2')){
          params.success && params.success(res.data);
        }else{
          //这里被称为服务器异常
          let error_code = res.data.error_code;
          this._show_error(error_code);
        }
      },
      fail:(err)=>{
        //这里是被称为API调用失败
        wx.showToast({
          title: '错误',
          icon: 'none',
          duration: 1500
        })
      }
    })
  }

  //返回错误信息,
  //"_"一般表示"保护变量",只有类对象和子类对象自己能访问到这些变量；
  //"__"一般表示"私有成员",只有类对象自己能访问，连子类对象也不能访问到这个数据。
  _show_error(errorCode){
    if(!errorCode){
      errorCode = 1;
    }
    const tip = tips[errorCode];
    wx.showToast({
      title: tip ? tip: tips[1],
      icon:'none',
      duration:1000
    })
  }
};
export {HTTP};