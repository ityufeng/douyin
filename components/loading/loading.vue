<template>
  <view class="loading" v-if="isLoading">
	<!-- 在微信开发者工具小程序里, 测试了v-show无效 -->
    <view class="circle blue"></view>
    <view class="circle red"></view>
  </view>
</template>

<script>
export default {
  name: "loading",
  computed: {
    isLoading() {
      return this.$store.state.loading;
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}

.blue {
  background: rgba(4, 0, 255, 0.8);
  animation: anim-blue 0.4s ease-in-out 0s infinite alternate;
}

.red {
  background: rgba(255, 0, 0, 0.8);
  animation: anim-red 0.4s ease-in-out 0s infinite alternate;
}

@keyframes anim-blue {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }
  to {
    transform: translate3d(1rem, 0, 0) scale(1.2);
  }
}
@keyframes anim-red {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }
  to {
    transform: translate3d(-1rem, 0, 0) scale(1.2);
  }
}
</style>
