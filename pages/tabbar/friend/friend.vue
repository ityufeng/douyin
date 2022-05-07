<template>
  <view class="friend-tabbar">
      <!-- object-fit="cover" -->
    <video
      id="vdo"
      class="fullH"
      src="http://vodkgeyttp9.vod.126.net/vodkgeyttp8/9qZRMGMr_1981362519_hd.mp4?ts=1651845599&rid=A3E2E2A6C9D45E7C4C8584B6AD5A3875&rl=3&rs=qodeDLkytOBnTAJxhRyqSyAOAGwbPcgt&sign=e52f55a9e81fcc348bb2f55be2510fa7&ext=loIlygDJaH%2BCnLiArEIMXmgFaQp0LY1ig3NB2OU7kPrBRHZzSs4XL6PutLLkO4028HWl4PCHNi%2BUJ32OWmWz%2B73hA7UlGJpO%2BCYRT%2FJx9xMgua9I6na51bAaXfjGxZaf7yfGYcvAcas12%2BE%2FqtbasbDv3jryoeqoxBZYnrGwPwFpvVrwHi7H4j7R3alBeaMv76uP7N98RQIMB3VtCGANY9Tom2xhJ40ti4tK%2FSeP%2FmgxicRhNei0H7%2Bu7v94dyEp"
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
