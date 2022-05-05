<template>
  <swiper
    class="swiper"
    vertical="true"
    :duration="250"
    @change="swiperChange"
    @animationfinish="animationEnd"
  >
    <swiper-item
      class="swiper-item"
      ref="swiperItem"
      v-for="(item, index) in vdoList"
      :key="index"
    >
      <view 
        class="swiper-item-content" 
        v-if="showList.includes(index)"
      >
        <!-- v-if="Math.abs(index - currentIndex) <= 1" -->
          <!-- :ref="`vdo${index}`" -->
        <video 
          v-if="currentIndex === index"
          id="vdo"
          class="vdoVideo"
          :src="item.urlInfo.url"
          :title="item.title"
          :controls="false"
        ></video>
        <button @tap="fullScreen" style="margin-top:100px;">全屏</button>
        <image
          class="vdoCover"
          :src="item.coverUrl"
          mode="widthFix"
        />
      </view>
    </swiper-item>
  </swiper>
</template>

<script>
import vdoArr from './test.js'
export default {
  name: "dySwiper",
  data() {
    return {
      currentIndex: 0,
      vdoList: [],
      pageNum: 0,
      loading: false,
    };
  },
  computed: {
    // 轮播里面只想渲染 currentIndex及上下, 共3个
    showList() {
      return [this.currentIndex - 1, this.currentIndex, this.currentIndex + 1];
    },
  },
  created() {
    // this.getVdoData();
    this.vdoList = vdoArr
  },
  mounted() {
    },
  methods: {
    fullScreen() {
      this.currentVdo = uni.createVideoContext('vdo', this)
      this.currentVdo.play()
      this.currentVdo.requestFullScreen()
      console.log('全屏', this.currentVdo)
    },
    swiperChange(e) {
      this.currentIndex = e.detail.current;
    },
    // 动画结束时触发
    animationEnd(e) {
      console.log('切换完成')
      // console.log(e)
      // 倒数第一个继续加载数据
      if (this.currentIndex >= this.vdoList.length - 1) {
        if (!this.loading) {
          // this.getVdoData()
        }
      }
    },
    // 加载数据
    async getVdoData() {
      try {
        this.loading = true
        uni.showLoading({
          title: "加载中",
        });
        let res = await this.$http({
          url: "/video/timeline/recommend",
          // url: "/personalized/mv",
          data: { offset: this.pageNum },
        });
        console.log("新数据", res);
        if (res.statusCode === 200) {
          this.pageNum++;
          let dataList = res.data.datas.map((item) => {
            return item.data;
          });
          this.vdoList.push(...dataList)
          console.log(this.vdoList)
          // console.log(this.vdoList.map(item => item.title))
          // this.$nextTick(() => {
          //   // this.$refs.vdo.requestFullScreen();
          //   // this.$refs.vdo.play()
          // })
        }
      } catch (error) {
        uni.hideLoading();
        this.loading = false
      } finally {
        uni.hideLoading();
        this.loading = false
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
.swiper {
  height: 100%;
  background: $blackBg;
  color: #eeeaea;
  .swiper-item {
    .swiper-item-content {
      height: 100%;
      font-size: 50px;
      position: relative;
      .vdoVideo, .vdoCover {
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
      }
      .vdoVideo {
        width: 100%;
        z-index: 1;
      }
    }
  }
}
</style>
