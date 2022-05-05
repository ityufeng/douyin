<template>
  <view>
    <view class="status_bar"> <!-- 这里是状态栏 --> </view>
    tabbar2
    <video
      id="vdo"
      src="http://vodkgeyttp9.vod.126.net/vodkgeyttp8/RXPUD7P6_2245149958_hd.mp4?ts=1651734667&rid=A3E2E2A6C9D45E7C4C8584B6AD5A3875&rl=3&rs=HQeHmcpjAvdkZKeQjqhqmzbrrscZnKqk&sign=2775407be357324a1d52c18539e53c3a&ext=loIlygDJaH%2BCnLiArEIMXmgFaQp0LY1ig3NB2OU7kPr3DYOcCX1yRbICg0oTCQiwRGimMPRQSBWkBOA3rECE7VfUiSmaZ9lA%2BFXinzxZit%2FH8MBfv%2B9IJvtuHCTiaGUhcNjyjQSQslem9EzPMRR3l9H7aVISxvp3a8c%2FNQRoDKrjOr3apVsO%2FxNJLUTTPlQb1pVyO1XfFuHm1ZY%2FUTMwv5N4TI6x1ZDr2ilzZnR5Ae9Ko%2Fp1%2FpIwTpbJQUI%2B7ofN"
    ></video>
    <button @click="aaa">全屏</button>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.currentVdo = uni.createVideoContext("vdo");
    console.log(this.currentVdo);
  },
  methods: {
    aaa() {
      setTimeout(() => {
        this.currentVdo.play();
        this.currentVdo.requestFullScreen();
      }, 1000);
    },
  },
};
</script>

<style></style>
