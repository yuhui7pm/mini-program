// pages/book-detail/book-detail.js
import {
  BookModel
} from '../../models/book.js';

import {
  ClassicModel
} from '../../models/classic.js';

const bookModel = new BookModel();
const likeModle = new ClassicModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount:0,
    posting:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options',options)
    //开始加载时，显示加载图标
    wx.showLoading({
      title: '详情页加载中',
    });
    const bid = options.bid;
    const detail = bookModel.getDetail(bid);
    const comments = bookModel.getComments(bid);
    const likeStatus = bookModel.getLikeStatus(bid);

    //还有一个类似的用法:promise.race,谁先执行完，就用谁的结果

    //通过promise.all返回一个promise实例 ，有一个失败，实例都会返回失败
    Promise.all([detail,comments,likeStatus]).then(res=>{
      this.setData({
        book:res[0],
        comments:res[1].comments,
        likeStatus:res[2].like_status,
        likeCount:res[2].fav_nums
      });
      //加载完毕之后
      wx.hideLoading();
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onLike:function(event){
    const like_or_cancel = event.detail.behaviour;
    likeModle.like(like_or_cancel, this.data.book.id, 400);
  },

  //评论时，点击取消
  onCancel:function(){
    this.setData({
      posting:false
    })
  },

  onFakePost: function () {
    this.setData({
      posting: true
    })
  },

  //点击右下角发送按钮
  onPost:function(event){
    let comment = event.detail.value||event.detail.text;

    if(!comment){
      return
    };

    if(comment.length>12){
      wx.showToast({
        title: '短评最多12个字',
        icon:"none"
      })
      return;
    };

    bookModel.postComment(this.data.book.id,comment).then(res=>{
      wx.showToast({
        title: '+1',
        icon:"none"
      })

      //更新指令，对一个值为数组的字段，往数组头部添加一个或多个值
      this.data.comments.unshift({
        content: comment,
        nums: 1
      })

      this.setData({
        comments: this.data.comments,
        posting: false
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})