import {HTTP} from '../util/http-p.js';

class KeywordModel extends HTTP{
  key = 'q';
  maxLength = 10;//搜索历史的最大长度

  //查找历史记录
  getHistory(){
    const words = wx.getStorageSync(this.key);
    if(!words){
      return [];
    }
    return words;
  }

  //得到热点搜索
  getHot(){
    return this.request({
      url:'/book/hot_keyword'
    })
  }

  //把自己的搜索，添加到搜索历史当中
  addToHistory(keyword){
    let words = this.getHistory();
    const has = words.includes(keyword);//include是ES6的语法
    if(!has){
      let len = words.length;
      if (len >= this.maxLength){
        words.pop();//移除最后一项历史记录
      }
      words.unshift(keyword);
      wx.setStorageSync(this.key, words);
    }
  }
}

export {KeywordModel};