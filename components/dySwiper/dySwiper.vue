<template>
  <swiper
    class="swiper-box"
    vertical
    :duration="250"
    @change="swiperChange"
    @animationfinish="animationEnd"
  >
    <swiper-item
      class="swiper-item"
      v-for="(item, index) in vdoList"
      :key="index"
    >
      <!-- v-if="Math.abs(index - currentIndex) <= 1" -->
      <view class="swiper-item-content" v-if="showList.includes(index)">
        <view class="vdo-box">
            <!-- :class="{'vdo-el': true, 'vertical': item.direct === 'vertical'}" -->
          <video 
            v-if="index === currentIndex"
            class="vdo-el"
            id="vdo"
            ref="vdo"
            loop
            :src="item.url"
            :title="item.title"
            @fullscreenchange="fScreenChange"
            @play="vdoPlay"
            @pause="vdoPause"
          ></video>
            <!-- autoplay -->
            <!-- :controls="isControl" -->
            <!-- @loadedmetadata="loaded" -->
        </view>
        <!-- <image class="vdo-cover" :src="item.coverUrl" mode="widthFix" /> -->
      </view>
    </swiper-item>
  </swiper>
</template>
<script>
import vdoArr from "./test.js";
export default {
  name: "dySwiper",
  data() {
    return {
      // 当前停留的轮播下标
      currentIndex: 0,
      // 轮播数据
      vdoList: [],
      // 轮播数据加载页数(一次请求得到8个轮播项)
      pageNum: 0,
      // 第一页的处理
      isFirst: true,
      // 是否正在加载中
      loading: false,
      // 是否显示 video 控制条
      isControl: false,
      // 是否自动播放
      isAutoPlay: false,
      // 可播放的视频对象
      currentVdo: null,
      // 是否显示 video
      vdoShow: false,
    }
  },
  computed: {
    // 轮播里面只想渲染 currentIndex及上下, 共3个
    showList() {
      return [this.currentIndex - 1, this.currentIndex, this.currentIndex + 1];
    },
  },
  created() {
    this.getVdoData()
  },
  methods: {
    /**
     * 轮播切换后
     */
    swiperChange(e) {
      // this.isAutoPlay = false
      // 切换的过程获取对应id的视频地址
      this.currentIndex = e.detail.current
    },
    /**
     * 切换动画结束后
     */
    animationEnd(e) {
      this.updateVdo()
      this.currentVdo.play()
      console.log('播放')
      if (this.currentIndex >= this.vdoList.length - 1) {
        if (!this.loading) {
          this.getVdoData()
        }
      }
    },
    vdoPlay() {
      console.log('--------------播放')
    },
    vdoPause() {
      console.log('--------------暂停')
    },
    // 进入全屏
    fullScreen() {
      this.currentVdo = uni.createVideoContext("vdo", this);
      // this.currentVdo.play();
      this.currentVdo.requestFullScreen();
    },
    // 切换全屏, 控制条显/隐
    fScreenChange(e) {
      this.isControl = !this.isControl;
      console.log("切换全屏, 控制条:", this.isControl);
    },
    // loaded(e) {
    //   console.log('视频加载完成', e)
    //   this.updateVdo()
    //   this.currentVdo.play()
    // },
    updateVdo() {
      this.currentVdo = uni.createVideoContext("vdo", this)
    },
    // 加载数据
    async getVdoData() {
      try {
        this.loading = true;
        uni.showLoading({
          title: "加载中",
        });
        // let res = await this.$http({
        //   url: "/video/timeline/recommend",
        //   // url: "/personalized/mv",
        //   data: { offset: this.pageNum },
        // });
        let res = vdoArr
        console.log("新数据", res);
        if (res.statusCode === 200) {
          if (res.data.datas.length) {
            this.pageNum++;
            // 只提取需要的内容
            res.data.datas.forEach((item) => {
              let data = item.data
              // 可能得到直播推荐, 不提取
              // 视频id
              let id = data.vid
              if (!id) return
              // 视频方向
              let direct = Number(data.width) >= Number(data.height) ? 'horizontal' : 'vertical'
              let url = data.urlInfo.url
              // 标题
              let title = data.title
              // 描述
              let description = data.description
              // 点赞数量
              let likeCount = data.praisedCount
              // 评论数量
              let commentCount = data.commentCount
              // 分享数量
              let shareCount = data.shareCount
              // 作者
              let creator = {
                userId: data.creator?.userId,
                avatarUrl: data.creator?.avatarUrl,
              }
              let res = { direct, title, description, likeCount, commentCount, shareCount, id, creator, url }
              this.vdoList.push(res)
            });
            console.log(this.vdoList)
            // 第一次加载
            if (this.isFirst) {
              this.$nextTick(() => {
                this.updateVdo()
                this.currentVdo.play()
                this.isFirst = !this.isFirst
              })
            }
          } else {
            // TODO: 修改为 Mv , 弹窗只能一次, 设置个标记变量
            uni.showModal({
              title: '获取失败!',
              content: '因为服务器限制! 暂时无法获取更多视频! 将改为播放网易云MV!',
            });
          }
        }
      } catch (error) {
        uni.hideLoading();
        this.loading = false;
      } finally {
        uni.hideLoading();
        this.loading = false;
      }
    },
  }
}
</script>
<style lang="scss" scoped>
@import "../../styles/variables.scss";

.swiper-box, .swiper-item, .swiper-item-content, .vdo-box, .vdo-el{
  height: 100%;
}
.swiper-box {
 
  background: $blackBg;
  color: #eeeaea;
  .swiper-item {
    .swiper-item-content {
      .vdo-box {
        .vdo-el {
          width: 100%;
          &.vertical {
          }
        }
      }
      .vdo-cover {
        width: 100%;
      }
    }
  }
}
</style>