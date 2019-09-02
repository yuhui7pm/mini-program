import {HTTP} from '../util/http.js';
class LikeModel extends HTTP{
  like(behavior,artID,category){
    let url = behavior=="like"?"like":"like/cancel";
    // console.log('category.type:',category,typeof(category))
    this.request({
      url,
      method:"POST",
      data:{
          art_id:artID,
          type:category
      }
    })
  }

  //避免缓存机制的点赞影响真实数据
  getClassicLikeStatus(artID, category, sCallback){
    this.request({
      url:'classic/'+category + '/' + artID +'/favor',
      success:(res)=>{
        sCallback(res);
      }
    })
  }
}

export {LikeModel};