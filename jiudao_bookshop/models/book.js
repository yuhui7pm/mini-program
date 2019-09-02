import {
  HTTP
} from '../util/http-p.js';

class BookModel extends HTTP{
  getHotList(){
    return this.request({
      url:"book/hot_list"
    })
  }

  //得到我喜欢的书籍的总数
  getUserBookCount(){
    return this.request({
      url:"book/favor/count"
    })
  }


  //获取书本的内容详情
  getDetail(bid){
    return this.request({
      url:`book/${bid}/detail`,
    })
  }

  //获取书本的喜欢人数
  getLikeStatus(bid){
    return this.request({
      url: `book/${bid}/favor`,
    })
  }

  //获取书本的短评
  getComments(bid){
    return this.request({
      url: `book/${bid}/short_comment`,
    })
  }

  //查看每本书之后，发表短评
  postComment(bid,comment){
    return this.request({
      url:"book/add/short_comment",
      method:'POST',
      data:{
        book_id:bid,
        content:comment
      }
    })
  }

  //搜索书籍的api
  search(start,query){
    return this.request({
      url: 'book/search?summary=1',
      data: {
        q: query,
        start
      }
    })
  }
}

export { BookModel }