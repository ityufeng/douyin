<template>
  <view class="friend-tabbar">
      <!-- object-fit="cover" -->
    <video
      id="vdo"
      class="fullH"
      src="http://vodkgeyttp9.vod.126.net/vodkgeyttp8/9VKUpTMS_2835435512_shd.mp4?ts=1651769982&rid=A3E2E2A6C9D45E7C4C8584B6AD5A3875&rl=3&rs=iyzbdJEYbNmIUILuQqZDAvvoVWtwSIdW&sign=9ea0bd37396ceb2f06b87532b232a519&ext=loIlygDJaH%2BCnLiArEIMXmgFaQp0LY1ig3NB2OU7kPr3DYOcCX1yRbICg0oTCQiwRGimMPRQSBWkBOA3rECE7VfUiSmaZ9lA%2BFXinzxZit%2FH8MBfv%2B9IJvtuHCTiaGUhcNjyjQSQslem9EzPMRR3l1GVSy%2FlQ8tk9g1B0afwqYiZ4Cd%2FdaMSudpg%2BQP4Rcv3Z%2FgtwljzJ0vTHJpR1jWWXmsrzrLWRcE5jp1J7KAd0IlwoPhyjE%2Bv3jrwA1xNdFEr"
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
    // console.log(this.currentVdo);
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

<style lang="scss" scoped>
.friend-tabbar {
  height: 100%;
  #vdo {
    width: 100%;
  }
  .fullH {
    height: 100%;
  }
}
</style>
