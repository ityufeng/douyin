<template>
  <swiper
    class="swiper-box"
    vertical
    :duration="250"
    @change="swiperChange"
    @animationfinish="animationEnd"
    :disable-touch="doNotChange"
  >
    <swiper-item
      class="swiper-item"
      v-for="(item, index) in vdoList"
      :key="index"
    >
      <view class="swiper-item-content" v-if="showList.includes(index)">
        <view class="vdo-box" v-if="currentIndex === index">
          <video
            class="vdo-player"
            loop
            :id="`vdoPlayer${index}`"
            :show-center-play-btn="false"
            :src="item.url"
            :title="item.title"
            @tap="vdoTap"
            @fullscreenchange="fScreenChange"
            @loadedmetadata="loaded"
            @play="vdoPlay"
            @pause="vdoPause"
          >
          </video>
            <!-- :object-fit="item.direct === 'vertical' ? 'fill' : 'container'" -->
            <!-- :poster="item.coverUrl" -->
        </view>
        <view class="descript-box">
          <view class="creator-name">@{{item.creator.nickname}}</view>
          <scroll-view class="description" scroll-y :show-scrollbar="false" @touchstart="touchS" @touchend="touchE">
            <text class="descript" v-if="item.description">{{item.description}}</text>
            <text class="tag" v-for="(tag, tagIndex) in item.tag" :key="tagIndex">
              {{tag}}
            </text>
          </scroll-view>
        </view>
        <view class="right">
          <view class="user" @click="tip">
            <image
              class="avatar"
              :src="item.creator.avatarUrl"
              mode="scaleToFill"
            />
            <view class="iconfont icon-zengjia"></view>
          </view>
          <view class="icon" @click="tip">
            <view class="iconfont icon-aixin"></view>
            <view class="num">{{item.likeCount | formatCount}}</view>
          </view>
          <view class="icon" @click="tip">
            <view class="iconfont icon-xiaoxizhongxin"></view>
            <view class="num">{{item.commentCount | formatCount}}</view>
          </view>
          <view class="icon" @click="tip">
            <view class="iconfont icon-fenxiangzhuanfa"></view>
            <view class="num">{{item.shareCount | formatCount}}</view>
          </view>
        </view>
        <view class="iconfont icon-bofang" v-if="!playing" @tap="togglePlay"></view>
        <image 
          v-show="!imgShowList[index]"
          class="coverImg"
          :src="item.coverUrl"
          mode="aspectFill"
        ></image>
          <!-- :mode="item.direct === 'vertical' ? 'heightFix' : 'widthFix'" -->
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
      // test: false,
      test: true,
      vdoList: [],
      // 当前停留的轮播下标
      currentIndex: 0,
      // 是否正在加载中
      loading: false,
      // 可播放的视频对象
      currentVdo: null,
      // 第一页的处理
      isFirst: true,
      // 轮播数据加载页数(一次请求得到8个轮播项)
      pageNum: 0,
      // 是否显示 video
      vdoShow: false,
      // 播放状态, 根据这个显示 自定义播放按钮
      playing: false,
      // swiper 不切换
      doNotChange: false,
    };
  },
  computed: {
    showList() {
      return [this.currentIndex - 1, this.currentIndex, this.currentIndex + 1];
    },
    vdoUrl() {
      return this.vdoList[this.currentIndex];
    },
    imgShowList() {
      return this.vdoList.map((item, index) => index === this.currentIndex && this.vdoShow)
    }
  },
  created() {
    this.getVdoData();
  },
  filters: {
    formatCount(val) {
      if(val>10000) {
        return (val / 10000).toFixed(1) + 'w'
      } else {
        return val
      }
    }
  },
  methods: {
    swiperChange(e) {
      this.playing = false;
      this.vdoShow = false
      this.currentIndex = e.detail.current;
    },
    animationEnd(e) {
      if (this.currentIndex >= this.vdoList.length - 1) {
        if (!this.loading) {
          this.getVdoData();
        }
      }
    },
    touchS() {
      this.doNotChange = true
    },
    touchE() {
      this.doNotChange = false
    },
    tip() {
      uni.showToast({
        title: `功能未开发!`,
        duration: 1000,
        icon: 'error'
      });
    },
    // 视频元数据加载完成, 自动播放
    loaded(e) {
      this.updateVdo();
      this.vdoShowTimer && clearTimeout(this.vdoShowTimer)
      this.vdoShowTimer = setTimeout(() => {
        this.currentVdo.play();
        this.vdoShow = true
      }, 200)
    },
    togglePlay(e) {
      this.updateVdo()
      if (this.playing) {
        this.currentVdo.pause()
      } else {
        this.currentVdo.play()
      }
    },
    vdoTap(e) {
      // console.log('e', e)
      let query = uni.createSelectorQuery().in(this)
      query.select(`#vdoPlayer${this.currentIndex}`)
        .boundingClientRect(info => {
          // console.log(info)
          // 只点击视频中部切换播放状态
          if (Math.abs(e.changedTouches[0].clientY - info.height/2) < 130 && Math.abs(e.changedTouches[0].clientX - info.width/2) < 130) {
            this.togglePlay()
          }
        })
        .exec();
    },
    vdoPlay() {
      this.playing = true;
    },
    vdoPause() {
      this.playing = false;
    },
    updateVdo() {
      this.currentVdo = uni.createVideoContext(`vdoPlayer${this.currentIndex}`, this);
    },
    async getVdoData() {
      try {
        this.loading = true;
        this.$loading(this.loading)
        // uni.showLoading({
        //   title: "加载中",
        // });
        let res = null;
        if (this.test) {
          console.log('用旧的数据, 频繁使用api接口会被限制')
          res = vdoArr;
        } else {
          console.log('获取新数据')
          res = await this.$http({
            url: "/video/timeline/recommend",
            // url: "/personalized/mv",
            data: { offset: this.pageNum },
          });
        }
        console.log("-新数据", res);
        if (res.statusCode === 200) {
          if (res.data.datas.length) {
            this.pageNum++;
            // 只提取需要的内容
            res.data.datas.forEach((item) => {
              let data = item.data;
              // 可能得到直播推荐, 不提取
              // 视频id
              let id = data.vid;
              if (!id) return;
              // 视频方向
              let direct = Number(data.width) >= Number(data.height) ? "horizontal" : "vertical";
              // 默认视频地址
              let url = data.urlInfo.url;
              // 标题
              let title = data.title;
              // 视频播放前的图片
              let coverUrl = data.coverUrl;
              // 描述
              let description = data.description;
              // 点赞数量
              let likeCount = data.praisedCount;
              // 评论数量
              let commentCount = data.commentCount;
              // 分享数量
              let shareCount = data.shareCount;
              // 作者
              let creator = {
                nickname: data.creator?.nickname,
                userId: data.creator?.userId,
                avatarUrl: data.creator?.avatarUrl,
              };
              let tag = data.videoGroup.map(i => `#${i.name}`)
              let res = { direct, title, coverUrl, tag, description, likeCount, commentCount, shareCount, id, creator, url, };
              this.vdoList.push(res);
            });
            console.log(this.vdoList);
            // 第一次加载
            if (this.isFirst) {
              this.$nextTick(() => {
                this.updateVdo();
                this.currentVdo.play();
                this.isFirst = !this.isFirst;
                // #ifdef H5
                  uni.showModal({
                    title: "限制!",
                    content: "浏览器限制! 首次播放需要点击!",
                    success: res => {
                      this.currentVdo.play()
                    }
                  })
                // #endif
              });
            }
          } else {
            uni.showModal({
              title: "获取失败!",
              content: "因为服务器限制! 暂时无法获取更多视频!",
            });
          }
        }
      } catch (error) {
        setTimeout(()=> {
          this.loading = false;
          this.$loading(this.loading)
        }, 500)
      } finally {
        setTimeout(()=> {
          this.loading = false;
          this.$loading(this.loading)
        }, 500)
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../styles/variables.scss";

.swiper-box, .swiper-item, .swiper-item-content, .vdo-box, .vdo-player { 
  height: 100%;
}
.swiper-box {
  background: $blackBg;
  .swiper-item-content {
    .icon-bofang {
      color: rgba(255, 255, 255, 0.7);
      font-size: 150rpx;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }
    .vdo-player {
      width: 100%;
    }
    .descript-box {
      position: absolute;
      width: 75%;
      padding-left: 28rpx;
      bottom: 90rpx;
      left: 0;
      .creator-name {
        color: #ffffff;
        line-height: 1.8;
        font-size: 34rpx;
        font-weight: bold;
      }
      .description {
        &::-webkit-scrollbar { width: 0px !important; }
        overflow-y: auto;
        max-height: 200rpx;
        color: #f1efef;
        font-size: 26rpx;
        .descript, .tag {
          margin-right: 16rpx;
        }
        .tag {
          font-weight: bold;
        }
      }
    }
    .right {
      position: absolute;
      bottom: 80rpx;
      right: 0;
      display: flex;
      flex-direction: column;
      width: 120rpx;
      color: #fff;
      .user {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 40rpx;
        .avatar {
          width: 90rpx;
          height: 90rpx;
          // outline: #f0f0f0 solid 6rpx;
          border: 6rpx solid #f0f0f0;
          border-radius: 50%;
        }
        .iconfont {
          position: absolute;
          left: 50%;
          bottom: -18rpx;
          transform: translateX(-50%);
          font-size: 40rpx;
          color: rgb(255, 35, 35);
        }
      }

      .icon {
        margin-bottom: 20rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        .iconfont {
          font-size: 70rpx;
          margin-bottom: 6rpx;
        }
        .num {
          font-size: 26rpx;
        }
      }
    }
    .right, .descript-box {
      z-index: 1;
    }
    .coverImg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
    }
  }
}

</style>
