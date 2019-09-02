const paginationBeh = Behavior({
  properties:{

  },

  data:{
    dataArray: [],
    total:null,
    noneResult: false,
    loading: false
  },

  methods:{
    //下拉加载更多数据
    setMoreData(dataArray){
      let tempArray = this.data.dataArray.concat(dataArray);
      this.setData({ dataArray:tempArray });
    },

    //得到现在所显示的列表项数目
    getCurrentStart(){
      return this.data.dataArray.length;
    },

    //当没有搜索结果的时候，返回 "搜索结果为空"
    setTotal(total){
      this.data.total = total;
      if(total==0){
        this.setData({ noneResult:true });
      }
    },

    //与总数对比，看是否已经全部显示完毕
    hasMore(){
      if(this.data.dataArray.length>=this.data.total){
        return false;
      }else{
        return true;
      }
    },

    //搜索失败或者成功之后的初始化
    initialize(){
      this.setData({
        dataArray: [],
        noneResult: false,
        loading: false
      })
      this.data.total = null;
    },

    isLocked(){
      return this.data.loading ? true : false;
    },

    locked() {
      this.setData({
        loading: true
      })
    },
    
    unLocked(){
      this.setData({
        loading:false
      })
    }
  }
});

export {paginationBeh};