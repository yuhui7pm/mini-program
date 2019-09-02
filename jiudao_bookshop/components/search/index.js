// components/search/index.js
import { 
  KeywordModel
} from '../../models/keyword.js';
import { 
  BookModel 
} from '../../models/book.js';
import {
  paginationBeh
} from '../behaviors/pagination.js';

const keywordModel = new KeywordModel();
const bookModel = new BookModel();

Component({
  behaviors: [paginationBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    more:{
      type:String,
      observer:'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    q:'',
    searching:false,
    loadingCenter:false,
    historyWords:[],
    hotWords:[]
  },

  attached(){
    this.setData({ historyWords: keywordModel.getHistory() });
    keywordModel.getHot().then(res=>{
      this.setData({hotWords: res.hot});  
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //滑到列表底部时，触发该事件
    loadMore(){
      if(!this.data.q){
        return 
      }
      if(this.isLocked()){
        return
      }
      if(this.hasMore()){
        //显示下拉菜单的加载动画
        this.locked();
        bookModel.search(this.getCurrentStart(),this.data.q).then(res=>{
          this.setMoreData(res.books);
          this.unLocked();
        },()=>{
          this.unLocked();
        })
      }
    },

    //搜索书籍
    onConfirm(event) {        //event:获取数据详情所有内容；
      this._showResult();     //用于搜索结果的显示
      this._showLoadingCenter();//显示加载动画
      const word = event.detail.value||event.detail.text;//搜索框或者tag的文本值
      //为了防止点击了搜索了之后，input的内容没了
      this.setData({
        q:word
      });
      bookModel.search(0,word).then(res=>{
        this.setMoreData(res.books);//使用concat连接arr
        this.setTotal(res.total);   //得到搜索结果的总数
        keywordModel.addToHistory(word);
        this._hideLoadingCenter();  //隐藏加载动画
      })
    },

    //点击取消按键
    onCancel:function(event){
      this.initialize();
      this.triggerEvent('cancel',{},{});
    },

    //点击输入框右侧的x号
    onDelete(event){
      this.initialize();
      this._closeResult();
    },

    // loading动画
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    // 屏蔽loading动画
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    }
  }
})
