// components/classic/music/index.js
// import { classicBeh } from '../classic-beh.js';
//得到背景音频管理器。
const mMgr = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  // behaviors:[classicBeh],
  properties: {
    src:String,
    title:String,
    img: String,
    content: String,
    hidden: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: './images/player2.png',
    playSrc: './images/player1.png'
  },

  //组件生命周期函数
  attached(event){
    this._recoverStatus();
    this._monitorSwitch();
  },

  methods: {
    //点击期刊的音乐，播放与停止功能
    onPlay:function(){
      console.log("this.properties.src",this.properties.src);
      if(!this.data.playing){
        this.setData({
          playing:true
        });
        mMgr.src = this.properties.src;
        mMgr.title = this.properties.title;
      }else{
        this.setData({
          playing:false
        })
        mMgr.pause();
      }
    },

    //音乐的暂停与开始
    _recoverStatus:function(){
      if(mMgr.paused){
        this.setData({
          playing: false
        })
        return; 
      }

      if(mMgr.src == this.properties.src){
        this.setData({
          playing:true
        })
      }
    },

    //音频控制器的播放与暂停等操作
    _monitorSwitch: function () {
      mMgr.onPlay(() => {
        this._recoverStatus();
      })

      mMgr.onPause(() => {
        this._recoverStatus();
      })

      mMgr.onStop(() => {
        this._recoverStatus();
      })

      mMgr.onEnded(() => {
        this._recoverStatus();
      })
    }
  }
})
