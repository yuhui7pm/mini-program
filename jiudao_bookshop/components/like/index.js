// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:{
      type:Boolean,
      value:false,
      observer:()=>{

      }
    },
    count:{
      type:Number
    },
    readOnly: {
      type: Boolean
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike:function(event){
      //设置只读，就不允许用户点赞
      if (this.properties.readOnly) {
        return
      }

      let like = this.properties.like;
      let count = this.properties.count;
      count = like?count-1:count+1; 
      this.setData({
        count,
        like:!like
      })

      //激活
      let behaviour = this.properties.like?"like":"cancel";
      this.triggerEvent('like',{
        behaviour
      },{})
    }
  }
})
