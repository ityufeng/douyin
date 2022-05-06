<script>
export default {
  onLaunch: function () {
    // console.log("App Launch");
    setTimeout(() => {
			uni.showTabBarRedDot({
				index: 1,
			});
      uni.setTabBarBadge({
        index: 3,
        text: "31",
      });
    }, 1000);
  },
  onShow: function () {
    // console.log("App Show");
  },
  onHide: function () {
    // console.log("App Hide");
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "./styles/global.scss";
@import "./styles/iconfont.css";
</style>
