import{
  BookModel
} from '../../models/book.js';
import {
  ClassicModel
} from '../../models/classic.js';

let classicModel = new ClassicModel();
let bookModel = new BookModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookCount:0,
    authorized:false,
    userInfo: null,
    classic:[]
  },

  onLoad(){
    this.userAuthorized();//得到用户授权信息
    this.getMyBookCount();//得到用户喜欢的书籍总数
    this.getMyFavor();    //得到用户喜欢的书籍，并显示出来
  },

  //得到用户的喜欢书籍总数
  getMyBookCount(){
    bookModel.getUserBookCount().then(res=>{
      this.setData({ bookCount: res.count })
    })
  },

  //得到用户喜欢的书籍，并显示出来
  getMyFavor(){
    classicModel.getUserFavor(res => {
      this.setData({
        classic: res
      })
    })
  },

  //得到用户授权信息
  userAuthorized(){
    wx.getSetting({
      success:data=>{
        if (data.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:dat=>{
              this.setData({
                authorized: true,
                userInfo: dat.userInfo
              })
            }
          })
        }
      }
    })
  },

  //将用户信息呈现在前端页面上
  onGetUserInfo(event){
    const userInfo = event.detail.userInfo;
    if(userInfo){
      this.setData({
        userInfo,
        authorized:true
      })
    }
  },

  //点击关于我们，实现页面跳转
  onJumpToAbout(event){
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  //根据喜欢的书籍跳转到详情页
  onJumpToDetail(event) {
    const cid = event.detail.cid
    const type = event.detail.type
    wx.navigateTo({
      url: `/pages/classic/classic?cid=${cid}&type=${type}`
    })
  },

  //关于学习页面
  onStudy(){
    wx.navigateTo({
      url: '/pages/course/course',
    })
  }
})