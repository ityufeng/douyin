<template>
  <view class="friend-tabbar">
    <view class="title">
      <view class="tag" v-for="(item, index) in title" :key="index" @tap="currentIndex = index" :class="{active: currentIndex === index}">{{item}}</view>
    </view>
    <swiper class="swiper-box"
      :duration="200"
      :current="currentIndex"
      @change="swChange"
    >
      <swiper-item class="swiper-item">
        <view class="friend">
          <view>暂时没有更多了</view>
        </view>
      </swiper-item>
      <swiper-item class="swiper-item">
        <view class="dynamic">
          <view>暂无朋友动态</view>
          <view class="find">快去寻找更多朋友吧</view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: ['朋友', '动态'],
      currentIndex: 1,
    };
  },
  mounted() {
  },
  methods: {
    swChange(e) {
      this.currentIndex = e.detail.current
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../../styles/variables.scss";
.friend-tabbar {
  background-color: $blackBg;
  height: 100%;
  color: #e9e9e9;
  .title {
    position: absolute;
    width: 100%;
    top: 40rpx;
    display: flex;
    justify-content: center;
    .tag {
      font-weight: bold;
      font-size: 36rpx;
      width: 200rpx;
      text-align: center;
      color: #cfcfcf;
      &.active {
        color: #fff;
      }
    }
  }
  .swiper-box {
    height: 100%;
    .swiper-item {
      height: 100%;
      .friend, .dynamic {
        padding-top: 260rpx;
        text-align: center;
      }
      .dynamic {
        .find {
          margin-top: 30rpx;
          color: grey;
        }
      }
    }
  }
}

</style>
