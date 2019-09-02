import { config } from '../config.js';

//错误信息数组
const tips = {
  1: "抱歉，出现了一个错误",
  1005: "appKey无效，请到www.7yue.pro重新获取",
  3000: "期刊不存在"
}

class HTTP {
  request({url,method="GET",data={}}){
    return new Promise((resolve,reject)=>{
      this._request(url,resolve,reject,method,data);
    })
  };
  
  //类下面的函数一般称为方法。
  _request(url,resolve,reject,method="GET",data={}) {
    // 形参中初始化了，就不用下面的代码了。
    // if (!params.method) {
    //   params.method = "GET";
    // };
    wx.request({
      url: config.api_base_url + url,
      method,
      data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        let code = res.statusCode.toString();
        //startsWith ; endsWith
        if (code.startsWith('2')) {
          resolve(res.data);
        } else {
          //这里被称为服务器异常
          reject();
          let error_code = res.data.error_code;
          this._show_error(error_code);
        }
      },
      fail: (err) => {
        //这里是被称为API调用失败
        reject();
        this._show_error(1);
      }
    })
  }

  //返回错误信息,
  //"_"一般表示"保护变量",只有类对象和子类对象自己能访问到这些变量；
  //"__"一般表示"私有成员",只有类对象自己能访问，连子类对象也不能访问到这个数据。
  _show_error(errorCode) {
    if (!errorCode) {
      errorCode = 1;
    }
    const tip = tips[errorCode];//考虑代码的健壮性。当检测到的错误不存在时，默认返回错误一
    wx.showToast({
      title: tip?tip:tips[1],
      icon: 'none',
      duration: 1000
    })
  }
};
export { HTTP };