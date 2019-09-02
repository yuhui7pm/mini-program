// pages/classic/classic.js
//import的时候要使用相对路径
import { ClassicModel} from '../../models/classic.js';
import {LikeModel} from '../../models/like.js';

let classicModel = new ClassicModel();//类要先实例化对象
let likeModel = new LikeModel();//实例化likemodel

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classic:{},
    first:false,
    latest:true,
    likeCount:0,
    likeStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res)=>{
      //数据更新，即使没有也可以加进去
      this.setData({
        classic:res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      });
    });
  },

  //自定义事件
  onLike: function (event) {
    console.log(event)
    let behaviour = event.detail.behaviour;//组件里面传递过来的
    likeModel.like(behaviour, this.data.classic.id, this.data.classic.type)
  },

  //获取上一期刊
  onPrevious: function (evnet) {
    this._updateClassic('previous');
  },

  //获取下一期刊函数
  onNext: function () {
    this._updateClassic('next')
  },

  //封装一个获取期刊的函数
  _updateClassic: function (nextOrPrevious) {
    let index = this.data.classic.index;
    // console.log('nextOrPrevious', nextOrPrevious);
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id, res.type);
      // console.log('测试点赞的状态:', res.id, res.type)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      });
      // console.log('测试翻页获得的数据：', res, res.url)
    })
  },

  //点赞数目不能使用缓存
  _getLikeStatus: function (artID, category){
    const status = likeModel.getClassicLikeStatus(artID,category,res=>{
      // console.log('res.fav_num', res.fav_nums, 'res.like_status', res.like_status)
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    });
    return status;
  }
})