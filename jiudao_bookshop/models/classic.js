import {HTTP} from '../util/http.js';
class ClassicModel extends HTTP{
  //获得最新期刊
  getLatest(sCallback){
    this.request({
      url:'classic/latest',
      success:(res)=>{
        sCallback(res);
        //把最新期刊号存入缓存中
        this._setLatestIndex(res.index);

        //把最新的期刊存入缓存
        let key = this._getKey(res.index);
        wx.setStorageSync(key, res);
      }
    })
  }

  //获取用户喜欢的书籍
  getUserFavor(sCallback) {
    this.request({
      url: 'classic/favor',
      success: sCallback
    })
  }

  //首页是否点赞组件
  like(behavior, catId, category) {
    let url = behavior == 'like' ? '/like' : '/like/cancel';
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: catId,
        type: category
      }
    })
  }

  //获取点赞的信息
  getClassicLikeStatus(artID, category, sCallback) {
    this.request({
      url: 'classic/' + category + '/' + artID + '/favor',
      success: sCallback
    })
  }

  //获取当前期刊的上一期或者下一期的方法
  getClassic(index,nextOrPrevious,sCallback){
    //利用缓存机制，先从缓存中寻找如果没有则从api中寻找然后存入缓存。
    let key = nextOrPrevious == "next" ? this._getKey(index + 1) : this._getKey(index - 1);
    let keyVal = wx.getStorageSync(key); //从缓存中获取数据
    // console.log(`classic/${index}/${nextOrPrevious}`)
    if(!keyVal){
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success:(res)=>{
          wx.setStorageSync(this._getKey(res.index),res);
          sCallback(res);
        }
      })
    }else{
      sCallback(keyVal);
    }
  }

  //判断当前期刊是否是第一期
  isFirst(index) {
    return index == 1 ? true : false
  }

  //判断当前期刊是否是最新的一期
  isLatest(index) {
    let latestIndex = this._getLatestIndex();
    return index == latestIndex ? true : false
  }

  //定义私有方法，把最新的期刊号存入到storage中
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index);
  }

  //定义私有方法，读取最新的期刊号
  _getLatestIndex() {
    let index = wx.getStorageSync('latest');
    return index
  }

 //定义私有方法，把每个期刊存入缓存时，都有一个独立的key
  _getKey(index){
    let key = 'classic-'+index;
    return key;
  }
}

export { ClassicModel};