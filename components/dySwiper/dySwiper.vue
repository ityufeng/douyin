<template>
  <swiper
    class="swiper"
    vertical="true"
    easing-function="easeInCubic"
    :duration="300"
    @change="swiperChange"
    @animationfinish="animationEnd"
  >
    <swiper-item
      class="swiper-item"
      v-for="(item, index) in vdoList"
      :key="index"
    >
      <view class="swiper-item-content" v-if="showList.includes(index)">
        {{ item.title }}
      </view>
    </swiper-item>
  </swiper>
</template>

<script>
export default {
  name: "dySwiper",
  data() {
    return {
      currentIndex: 0,
      vdoList: [],
    };
  },
  computed: {
    // 只想渲染 currentIndex及上下, 共3个
    showList() {
      return [this.currentIndex - 1, this.currentIndex, this.currentIndex + 1];
    },
  },
  created() {
    this.getVdoData();
  },
  methods: {
    swiperChange(e) {
      this.currentIndex = e.detail.current;
    },
    animationEnd(e) {
      // console.log(e)
      // 倒数第二个继续加载数据
      if (this.currentIndex >= this.vdoList.length - 1) {
        this.lastIndex = this.vdoList.length + 1;
        for (let i = 0; i <= 3; i++) {
          this.vdoList.push(this.lastIndex + i);
          console.log(this.lastIndex + i);
        }
      }
    },
    async getVdoData() {
      try {
        uni.showLoading({
          title: "加载中",
        });
        let res = await this.$http({
          url: 'https://musicapi.yjsjyb.top/video/timeline/recommend',
          data: { offset: 1 },
        });
        // console.log("新数据", res);
        if (res.statusCode === 200) {
          let dataList = res.data.datas.map((item) => {
            return item.data;
          });
          this.vdoList = [...dataList];
        }
      } catch (error) {
        uni.hideLoading();
      } finally {
        uni.hideLoading();
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
      font-size: 50px;
      text-align: center;
    }
  }
}
</style>
