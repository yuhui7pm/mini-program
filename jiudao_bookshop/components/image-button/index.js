// components/image-btn/index.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots:true,
  },

  properties: {
    openType:{
      type:String,
    }
  },

  ready(){
    // console.log(1111111)
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */

  methods: {
    onGetUserInfo(event) {
      this.triggerEvent('getuserinfo', event.detail, {})
    }
  }
})
